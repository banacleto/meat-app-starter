import { NgModule } from "@angular/core";
import { OrderService } from "app/order/order.service";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantService } from "app/restaurants/restaurants.service";

/**
 * Módulo obsoleto. Ver SharedModule (shared/shared.module.ts) usando ModuleWithProviders
 */
@NgModule({
    providers: [ShoppingCartService, RestaurantService, OrderService]
})
export class CoreModule { }