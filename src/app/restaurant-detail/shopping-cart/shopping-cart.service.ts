import { CarItem } from "./car-item.model";
import { MenuItem } from "../menu-item/menu-item.model";

export class ShoppingCartService {
    items: CarItem[] = []

    clear() {
        this.items = []
    }

    addItem(item: MenuItem) {
        let foundItem = this.items.find((cartItem) => cartItem.menuItem.id === item.id)
        if (foundItem) {
            foundItem.quantity = foundItem.quantity + 1
        } else {
            this.items.push(new CarItem(item))
        }
    }

    removeItem(item: CarItem) {
        this.items.splice(this.items.indexOf(item), 1)
    }

    total(): number {
        return this.items
            .map(item => item.value())
            .reduce((prev, value) => prev + value, 0)
    }




}