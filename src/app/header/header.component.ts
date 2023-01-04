import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { product } from "../listingData";
import { ListingService } from "../services/listing.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {

    iconBars = faBars;
    iconHome = faHome;
    iconCart = faCartPlus;
    iconLogout = faKey;

    isLoggedIn = "default";
    userName = "";
    cartItems = 0;
    cartData: product | undefined;
    searchResult: undefined | product[];

    //toFix
    isMenuOpened = true;

    navbarfixed = false;

    @HostListener("window:scroll", ["$event"]) onscroll() {
        if (window.scrollY > 66) {
            this.navbarfixed = true;
        }
        else {
            this.navbarfixed = false;
        }
    }

    constructor(private route: Router, private product: ListingService) { }

    ngOnInit(): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.route.events.subscribe((val: any) => {
            if (val.url) {
                if (localStorage.getItem("user")) {
                    const userStore = localStorage.getItem("user");
                    const userInfo = userStore && JSON.parse(userStore);
                    // this.userName = "Signed in: "+userInfo.name;
                    this.isLoggedIn = "user";
                    this.product.getCartList(userInfo.id);
                }
                else {
                    this.isLoggedIn = "default";
                }
            }
        });
        const cartData = localStorage.getItem("localCart");
        if (cartData) {
            this.cartItems = JSON.parse(cartData).length;
        }
        this.product.cartData.subscribe((items) => {
            this.cartItems = items.length;
        });
    }

    signOut() {
        localStorage.removeItem("user");
        this.route.navigate(["/user"]);
        this.userName = "";
        this.product.cartData.emit([]);
    }

    findProduct(query: KeyboardEvent) {
        if (query) {
            const element = query.target as HTMLInputElement;
            this.product.findProduct(element.value).subscribe((result) => {
                if (result.length > 2) {
                    result.length = 2;
                }
                this.searchResult = result;
            });
        }
    }
    showMobileMenu() {
        this.isMenuOpened = !this.isMenuOpened;
        console.log(this.isMenuOpened);
    }

    submitSearch(val: string) {
        console.warn(`query: ${val}`);
        this.route.navigate([`search/${val}`]);
    }
    hideSearch() {
        this.searchResult = undefined;
    }

}
