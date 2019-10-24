import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MEAT_API } from "app/app.api";
import { CarItem } from "app/restaurant-detail/shopping-cart/car-item.model";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Order } from "./order.model";
import { LoginService } from "app/security/login/login.service";

@Injectable()
export class OrderService {

    constructor(private loginService: LoginService, private cartService: ShoppingCartService,
        private http: HttpClient) { }

    itemsValue(): number {
        return this.cartService.total()
    }

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

    clear() {
        this.cartService.clear()
    }

    checkOrder(order: Order): Observable<string> {
        let headers = new HttpHeaders()
        if (this.loginService.isLoggedIn()) {
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
        }
        return this.http.post<Order>(`${MEAT_API}/orders`, order, { headers: headers }).map(order => order._id)
    }

}