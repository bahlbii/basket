import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { cart, product } from "../listingData";
import { ListingService } from "../services/listing.service";

@Component({
    selector: "app-listing-details",
    templateUrl: "./listing-details.component.html",
    styleUrls: ["./listing-details.component.scss"]
})
export class ListingDetailsComponent implements OnInit {
    productData: undefined | product;
    productQuantity = 1;
    removeCart = false;
    cartData: product | undefined;
    iconPlus = faPlusCircle;
    iconMinus = faMinusCircle;
    
    constructor(private activeRoute: ActivatedRoute, private product: ListingService, private router: Router) { }

    ngOnInit(): void {
        const productId = this.activeRoute.snapshot.paramMap.get("productId");
        productId && this.product.getProduct(productId).subscribe((result) => {
            this.productData = result;
            const cartData = localStorage.getItem("localCart");

            if (productId && cartData) {
                let items = JSON.parse(cartData);
                items = items.filter((item: product) => productId === item.id.toString());
                if (items.length) {
                    this.removeCart = true;
                } else {
                    this.removeCart = false;
                }
            }

            const user = localStorage.getItem("user");
            if (user) {
                const userId = user && JSON.parse(user).id;
                this.product.getCartList(userId);

                this.product.cartData.subscribe((result) => {
                    const item = result.filter((item: product) => productId?.toString() === item.productId?.toString());
                    if (item.length) {
                        this.cartData = item[0];
                        this.removeCart = true;
                    }
                });
            }
        });
    }
    handleQuantity(val: string) {
        if (this.productQuantity < 20 && val === "plus") {
            this.productQuantity += 1;
        } else if (this.productQuantity > 1 && val === "min") {
            this.productQuantity -= 1;
        }
    }
    addToCart() {
        if (this.productData) {
            this.productData.quantity = this.productQuantity;
            if (!localStorage.getItem("user")) {
                this.product.tempCart(this.productData);
                this.removeCart = true;
            } else {
                const user = localStorage.getItem("user");
                const userId = user && JSON.parse(user).id;
                const cartData: cart = {
                    ...this.productData,
                    productId: this.productData.id,
                    userId
                };
                // delete cartData.id;
                this.product.addToCart(cartData).subscribe((result) => {
                    if (result) {
                        this.product.getCartList(userId);
                        this.removeCart = true;
                    }
                });
            }
        }
        this.router.navigate(["/cart"]);
    }
}
