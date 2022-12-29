import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faLessThan, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { cart, order } from "../listingData";
import { ListingService } from "../services/listing.service";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
    //plus minus arrow icons
    iconArrow = faLessThan;
    iconPlus = faPlusCircle;
    iconMinus = faMinusCircle;
    cartData: cart[] | undefined;

    constructor(private product: ListingService, private router: Router) { }

    ngOnInit(): void {
        this.product.currentCart().subscribe((result) => {
            this.cartData = result;

        });
    }

    removeItem(cartNumber: number | undefined) {
        cartNumber && this.cartData && this.product.deleteFromCart(cartNumber)
            .subscribe(() => {
                this.getCart();
            });
    }

    getCart() {
        this.product.currentCart().subscribe((result) => {
            this.cartData = result;
        });
    }
    decItemQuantity(itemId: any) { //toFix

        this.product.currentCart().subscribe((result) => {
            this.cartData = result; //this is all of the cart

            const itemToUpdate = this.cartData.findIndex((item => item.productId == itemId));
            console.warn(`objIndex: ${itemToUpdate}`);

            //update quantity
            this.cartData[itemToUpdate].quantity = 10; //toFix
            console.warn(this.cartData[itemToUpdate]);
        });
    }
    incItemQuantity() {
        console.warn("q increased");
    }
    submitOrder() {

        if (this.cartData) {
            this.cartData?.forEach((item) => {
                setTimeout(async () => {
                    item.id && this.product.emptyFullCart(item.id);
                }, 700);
            });
            console.warn("cart emptied");
        }

        this.router.navigate(["/"]);
    }
    continueShopping() {
        this.router.navigate(["/"]);
    }
}
