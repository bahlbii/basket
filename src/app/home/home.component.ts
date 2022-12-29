import { Component, OnInit } from "@angular/core";
import { cart, product } from "../listingData";
import { ListingService } from "../services/listing.service";
import { faLiraSign } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    icon = faLiraSign;
    productList: undefined | product[];
	
    productData: undefined | product;
    productQuantity = 1;
    removeCart = false;
    cartData: undefined | product ;

    constructor(private activeRoute: ActivatedRoute, 
        private product: ListingService, 
        private router: Router) { }


    ngOnInit(): void {
        this.product.productList().subscribe((data)=>{
            this.productList = data;
        });
    }

    addToCart(itemId: number){
        
        this.product.getProduct(itemId.toString()).subscribe((data) => {
            this.productData = data;
        });

        if(this.productData){
            this.productData.quantity = this.productQuantity;
            if(!localStorage.getItem("user")){
                this.product.tempCart(this.productData);
                this.removeCart=true;
            }
            else {
                const user = localStorage.getItem("user");
                const userId= user && JSON.parse(user).id;
                const cartData: cart = {
                    ...this.productData,
                    productId: this.productData.id,
                    userId
                };
                
                this.product.addToCart(cartData).subscribe((result)=>{
                    if(result){
                        this.product.getCartList(userId);
                        this.removeCart=true;
                    }
                });        
            }
            this.router.navigate(["/cart"]); 
        } 
    }
}
