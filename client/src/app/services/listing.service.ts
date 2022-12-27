import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { cart, order, product } from "../listingData";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ListingService {

    cartData = new EventEmitter<product[] | []>();
    
    constructor(private http:HttpClient) { }
    getProduct(id: string){
        return this.http.get<product>(`http://localhost:3000/listing/${id}`);
        
    }
    //toFix
    addToCart(cartData: cart):Observable<object> {
        return this.http.post("http://localhost:3000/cart", cartData);
    }
    productList(){
        return this.http.get<product[]>("http://localhost:3000/listing"); //toFix
    }
    findProduct(query: string){
        return this.http.get<product[]>(`http://localhost:3000/listing?q=${query}`);
    }
    tempCart(data: product) {
        let cartData = [];
        const localCart = localStorage.getItem("localCart");
        if (!localCart) {
            localStorage.setItem("localCart", JSON.stringify([data]));
            this.cartData.emit([data]);
        } else {
            cartData = JSON.parse(localCart);
            cartData.push(data);
            localStorage.setItem("localCart", JSON.stringify(cartData));
            this.cartData.emit(cartData);
        }
    }
    
    removeItemFromCart(productId: number) {
        const cartData = localStorage.getItem("localCart");
        if (cartData) {
            let items: product[] = JSON.parse(cartData);
            items = items.filter((item: product) => productId !== item.id);
            localStorage.setItem("localCart", JSON.stringify(items));
            this.cartData.emit(items);
        }
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
    deleteFromCart(cartNumber: number) {
        return this.http.delete("http://localhost:3000/cart/" + cartNumber);
    }
    currentCart() {
        const userStore = localStorage.getItem("user");
        const userInfo = userStore && JSON.parse(userStore);
        return this.http.get<cart[]>("http://localhost:3000/cart?userId=" + userInfo.id);
    }
    
    orderNow(data: order) {
        return this.http.post("http://localhost:3000/orders", data);
    }
    
    emptyFullCart(cartNumber: number) {
        return this.http.delete("http://localhost:3000/cart/" + cartNumber);
    }
}
