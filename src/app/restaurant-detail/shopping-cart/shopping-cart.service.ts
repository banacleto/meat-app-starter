import { Injectable } from '@angular/core';
import { NotificationService } from 'app/shared/messages/notification.service';
import { MenuItem } from '../menu-item/menu-item.model';
import { CarItem } from './car-item.model';

@Injectable()
export class ShoppingCartService {
    items: CarItem[] = []

    constructor(private notificationService: NotificationService) {}

    clear() {
        this.items = []
    }

    addItem(item: MenuItem) {
        let foundItem = this.items.find((cartItem) => cartItem.menuItem._id === item._id)
        if (foundItem) {
            this.increaseQty(foundItem)
        } else {
            this.items.push(new CarItem(item))
        }
        this.notificationService.notify(`Você adicionou o item ${item.name}`)
    }

    increaseQty(item: CarItem) {
        item.quantity = item.quantity + 1
    }

    decreaseQty(item: CarItem) {
        item.quantity = item.quantity - 1
        if (item.quantity === 0) {
            this.removeItem(item)
        }
    }

    removeItem(item: CarItem) {
        this.items.splice(this.items.indexOf(item), 1)
        this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`)
    }

    total(): number {
        return this.items
            .map(item => item.value())
            .reduce((prev, value) => prev + value, 0)
    }
}
