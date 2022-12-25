import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { cart, product } from "../listingData";

@Injectable({
    providedIn: "root"
})
export class ListingService {

    cartData = new EventEmitter<product[] | []>();
    
    constructor(private http:HttpClient) { }
    getProduct(id: string){
        return this.http.get<product>(`ttp://localhost:3000/listing/${id}`);
    }
    addToCart(cartData: cart) {
        return this.http.post("http://localhost:3000/cart", cartData);
    }
    productList(){ //toFix
        return this.http.get<product[]>("http://localhost:3000/listing"); //toFix
    }
    searchProducts(query: string){
        return this.http.get<product[]>(`http://localhost:3000/listing?q=${query}`);
    }
    getCartList(userId: number) {
        return this.http
            .get<product[]>("http://localhost:3000/cart?userId=" + userId, {
                observe: "response",
            })
            .subscribe((result) => {
                if (result && result.body) {
                    this.cartData.emit(result.body);
                }
            });
    }
}
