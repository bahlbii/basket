import { Component, OnInit } from "@angular/core";
import { cart, login, product, signUp } from "../listingData";
import { ListingService } from "../services/listing.service";
import { UserService } from "../services/user.service";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
    showLogin=true;
    authError="";
    constructor(private user: UserService, private product: ListingService) {}

    ngOnInit(): void {
        this.user.userAuthReload();
    }

    signUp(data: signUp) {
        this.user.userSignUp(data);
    }
    login(data: login) {
        this.user.userLogin(data);
        this.user.invalidUserAuth.subscribe((result)=>{
            console.warn(result);
            if(result){
                this.authError="User not found";
            }else{
                this.localCartToRemoteCart();
            }
      
        });
    }
    openSignUp(){
        this.showLogin=false;
    }
    openLogin(){
        this.showLogin=true;
    }

    localCartToRemoteCart(){
        const data = localStorage.getItem("localCart");
        const user = localStorage.getItem("user");
        const userId= user && JSON.parse(user).id;
        if(data){
            const cartDataList:product[]= JSON.parse(data);
  
            cartDataList.forEach((product:product, index)=>{
                const cartData:cart={
                    ...product,
                    productId: product.id,
                    userId,
                    category: "",
                    color: "",
                    description: "",
                    quantity: undefined
                };
                delete cartData.id;
                setTimeout(() => {
                    this.product.addToCart(cartData).subscribe((result: any)=>{
                        if(result){
                            console.warn("data is stored in DB");
                        }
                    });
                }, 500);
                if(cartDataList.length===index+1){
                    localStorage.removeItem("localCart");
                }
            });
        }

        setTimeout(() => {
            this.product.getCartList(userId);
        }, 2000);
    
    }

}
