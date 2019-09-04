import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CarItem } from "app/restaurant-detail/shopping-cart/car-item.model";

@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingCartService) { }

    cartItems(): CarItem[] {
        return this.cartService.items
    }

    increaseQty(item: CarItem) {
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CarItem) {
        this.cartService.decreaseQty(item)
    }

    remove(item: CarItem) {
        this.cartService.removeItem(item)
    }

}