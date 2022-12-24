import { Component, OnInit } from "@angular/core";
import { product } from "../listingData";
import { ListingService } from "../services/listing.service";
import { faLiraSign } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
	icon=faLiraSign;
	productList: undefined | product[];
	
	constructor(private product:ListingService) { }

	ngOnInit(): void {
		this.product.productList().subscribe((data)=>{
			this.productList=data;
		});
	}
}
