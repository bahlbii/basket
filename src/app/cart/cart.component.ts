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

    confirmationMessage: string | undefined;

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
    decQuantity(itemId: any) { //toFix

        this.product.currentCart().subscribe((result) => {
            this.cartData = result; //this is all of the cart

            const itemToUpdate = this.cartData.findIndex((item => item.productId == itemId));
            console.warn(`objIndex: ${itemToUpdate}`);

            //update quantity
            this.cartData[itemToUpdate].quantity = 10; //toFix
            console.warn(this.cartData[itemToUpdate]);
        });
    }
    incQuantity() {
        console.warn("q increased");
    }
    submitOrder(data: any) {
        const user = localStorage.getItem("user");
        const user_id = user && JSON.parse(user).id;
        if (user) {
            const orderData: order = {
                ...data,
                user_id,
                order_id: undefined
            };

            // call delete function
            this.cartData?.forEach((item) => {
                setTimeout(() => {
                    item.id && this.product.removeItemFromCart(item.id);
                }, 700);
            });

            //send confirmation to user about order success
            this.product.submitOrder(orderData).subscribe((result) => {
                if (result) {
                    this.confirmationMessage = "Order success";

                    console.warn(this.confirmationMessage);
                    setTimeout(() => {
                        this.confirmationMessage = undefined;
                        this.router.navigate(["/cart"]);
                    }, 4000);
                }
            });
            console.warn(this.cartData);
        }
    }
    continueShopping() {
        this.router.navigate(["/"]);
    }
}
