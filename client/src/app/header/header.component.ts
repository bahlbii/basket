import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { product } from "../listingData";
import { ListingService } from "../services/listing.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {

    menuType = "default";
    userName="";
    cartItems=0;
    searchResult: undefined | product[];

    constructor(private route: Router, private product: ListingService) {}

    ngOnInit(): void {
        this.route.events.subscribe((val: any) => {
            if (val.url) {
                if(localStorage.getItem("user")){
                    const userStore = localStorage.getItem("user");
                    const userData = userStore && JSON.parse(userStore);
                    this.userName= userData.name;
                    this.menuType="user";
                    this.product.getCartList(userData.id);
                }
                else {
                    this.menuType = "default";
                }
            }
        });
        const cartData= localStorage.getItem("localCart");
        if(cartData){
            this.cartItems= JSON.parse(cartData).length;
        }
        this.product.cartData.subscribe((items)=>{
            this.cartItems= items.length;
        });
    }

    userLogout(){
        localStorage.removeItem("user");
        this.route.navigate(["/user"]);
        this.product.cartData.emit([]);
    }
      
    searchProducts(query: KeyboardEvent) {
        if (query) {
            const element = query.target as HTMLInputElement;
            this.product.searchProducts(element.value).subscribe((result) => {
                if (result.length > 2) {
                    result.length = 2;
                }
                this.searchResult = result;
            });
        }
    }

    submitSearch(val: string){
        console.warn(`query: ${val}`);
        this.route.navigate([`search/${val}`]);
    }
    hideSearch() {
        this.searchResult = undefined;
    }

}
