import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { HomeComponent } from "./home/home.component";
import { ListingDetailsComponent } from "./listing-details/listing-details.component";
import { OrdersComponent } from "./orders/orders.component";
import { SearchComponent } from "./search/search.component";
import { UserComponent } from "./user/user.component";

const routes: Routes = [
    {
        path: "", 
        component: HomeComponent
    },
    {
        path: "search/:query", 
        component: SearchComponent
    },
    {
        path: "details/:productId",
        component: ListingDetailsComponent
    },
    {  
        path:"user",
        component: UserComponent,
    },
    {
        path:"cart",
        component: CartComponent,
    },
    {
        path:"checkout",
        component: CheckoutComponent,
    },
    {
        path:"orders",
        component: OrdersComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
