import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarItem } from 'app/restaurant-detail/shopping-cart/car-item.model';
import { LoginService } from 'app/security/login/login.service';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';



@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
  orderForm: FormGroup
  delivery: number = 8
  orderId: string

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'DIN' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]

  constructor(private orderService: OrderService, private loginService: LoginService,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control(this.loginService.user.fullName, [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control(this.loginService.user.email, [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control(this.loginService.user.email, [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', Validators.required)
    }, { validator: OrderComponent.equalsTo })
  }

  // Função capaz de validar um ou mais campos utilizados no form
  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    if (!email || !emailConfirmation) {
      return undefined
    }
    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true }
    }

    return undefined
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
    order.orderItems = this.cartItems().map((item: CarItem) => new OrderItem(item.quantity, item.menuItem._id))

    this.orderService.checkOrder(order).subscribe((orderId: string) => {
      this.orderId = orderId
      this.router.navigate(['/order-summary'])
      this.orderService.clear()
    })
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined
  }
}
