import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { product } from "../listingData";

@Injectable({
	providedIn: "root"
})
export class ListingService {

	constructor(private http:HttpClient) { }
	productList(){ //toFix
		return this.http.get<product[]>("http://localhost:3000/listing"); //toFix
	}
}
