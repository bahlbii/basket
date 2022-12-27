import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { CartComponent } from "./cart/cart.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ListingDetailsComponent } from "./listing-details/listing-details.component";
import { SearchComponent } from "./search/search.component";
// import { FooterComponent } from "./footer/footer.component";
// import { OrdersComponent } from "./orders/orders.component";
import { UserComponent } from "./user/user.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        CartComponent,
        ListingDetailsComponent,
        SearchComponent,
        UserComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
