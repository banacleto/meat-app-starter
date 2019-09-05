import { Component, OnInit, Input } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CarItem } from 'app/restaurant-detail/shopping-cart/car-item.model';
import { Order, OrderItem } from './order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'DIN' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CarItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: CarItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CarItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CarItem) {
    this.orderService.remove(item)
  }

  // Preparando o pedido para checkout
  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map((item: CarItem) => new OrderItem(item.quantity, item.menuItem.id))

    this.orderService.checkOrder(order).subscribe((orderId: string) => {
      console.log(`Compra concluída: ${orderId}`)
      this.orderService.clear()
    })
  }

}
