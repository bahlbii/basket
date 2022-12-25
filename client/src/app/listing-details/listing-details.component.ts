import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { product } from "../listingData";
import { ListingService } from "../services/listing.service";

@Component({
    selector: "app-listing-details",
    templateUrl: "./listing-details.component.html",
    styleUrls: ["./listing-details.component.scss"]
})
export class ListingDetailsComponent implements OnInit {

    productData: undefined | product;
    constructor(private activeRoute: ActivatedRoute,
      private product: ListingService) { }

    ngOnInit(): void {
        const productId = this.activeRoute.snapshot.paramMap.get("");
        console.warn(productId);

        productId && this.product.getProduct(productId).subscribe((result) => {
            console.warn(result);
            this.productData = result;
        });
    }

}
