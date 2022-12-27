import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { product } from "../listingData";
import { ListingService } from "../services/listing.service";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {

    searchResult: undefined | product[];

    constructor(private activeRoute: ActivatedRoute, private product: ListingService) { }

    ngOnInit(): void {
        const query = this.activeRoute.snapshot.paramMap.get("query");
        console.warn(query);
        // query && this.product.searchProduct(query).subscribe((result)=>{
        //     this.searchResult=result;
        // });
    }

}
