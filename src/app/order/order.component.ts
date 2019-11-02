import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarItem } from 'app/restaurant-detail/shopping-cart/car-item.model';
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
  delivery = 8
  orderId: string

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'DIN' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]

  constructor(private orderService: OrderService, private router: Router, private formBuilder: FormBuilder) { }

  /**
   * Até o Angular 4, quando digitávamos em um campo do formulário, a atualização e a validação, aconteciam apenas no evento change
   * do campo. Então, a cada letra digitada, esse processo era disparado e a gente tinha o feedback instântaneo. Esse comportamento
   * é o padrão no Angular 5 e 6, mas agora podemos mudar isso para outros dois eventos: blur e submit.
   *
   * Se tivessemos utilizando Templat Forms, também poderíamos fazer essa modificação:
   * i. Associando ao campo que queremos alterar o comportamento:
   *  <input name="name" ngModel [ngModelOptions]="{ updateOn: 'blur' }">
   * ii. Aplicando para todos os campos do formulário:
   *  <form [ngFormOptions]="{ updateOn: 'blur' }">
   *   <input ...>
   *  </form>
   */
  ngOnInit() {
    /**
     * Alterando de 'this.formBuilder.group' para new FormGroup(...), podemos aplicar o evento 'blur' a todos os campos do formulário.
     */
    this.orderForm = this.formBuilder.group({
      /**
       * Como exemplo, estamos aplicando o evento 'blur' individualmente ao campo. Para isso, substituimos 'this.formBuilder.control' por
       * 'new FormControl(...)', pois ele já tem a capacidade de receber essas informações.
       */
      name: new FormControl('', { validators: [Validators.required, Validators.minLength(5)], updateOn: 'blur' }),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: new FormControl('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', Validators.required)
    }, { validator: OrderComponent.equalsTo }) /* { validators: [OrderComponent.equalsTo], updateOn: 'blur' }) */
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
    order.orderItems = this.cartItems().map(
      (item: CarItem) => new OrderItem(
        item.menuItem._id, item.menuItem.name, item.menuItem.price, item.quantity
      )
    )

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
