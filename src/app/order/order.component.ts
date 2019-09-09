import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';

import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CarItem } from 'app/restaurant-detail/shopping-cart/car-item.model';
import { Order, OrderItem } from './order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'DIN' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]

  constructor(private orderService: OrderService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      emailConfirmation: this.formBuilder.control(''),
      address: this.formBuilder.control(''),
      number: this.formBuilder.control(''),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('')
    })
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
      this.router.navigate(['/order-summary'])
      this.orderService.clear()
    })
  }

}
