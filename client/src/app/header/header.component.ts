import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { product } from "../listingData";
import { ListingService } from "../services/listing.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

	searchResult: undefined | product[];

	constructor(private route: Router, private product: ListingService) { }

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	ngOnInit(): void {
	}

	searchProducts(query: KeyboardEvent){
		if(query){
			const element = query.target as HTMLInputElement;
			this.product.searchProducts(element.value).subscribe((result) => {
				if(result.length > 2) {
					result.length = 2;
				}
				this.searchResult = result;
			});
		}
	}
	hideSearch(){
		this.searchResult = undefined;
	}
}
