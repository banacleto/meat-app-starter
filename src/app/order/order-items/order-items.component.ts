import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CarItem } from 'app/restaurant-detail/shopping-cart/car-item.model';

@Component({
  selector: 'mt-order-items',
  templateUrl: './order-items.component.html'
})
export class OrderItemsComponent implements OnInit {

  @Input() items: CarItem[]

  @Output() increaseQty = new EventEmitter<CarItem>()
  @Output() decreaseQty = new EventEmitter<CarItem>()
  @Output() remove = new EventEmitter<CarItem>()

  constructor() { }

  ngOnInit() {
  }

  emitIncreaseQty(item: CarItem) {
    this.increaseQty.emit(item)
  }

  emitDecreaseQty(item: CarItem) {
    this.decreaseQty.emit(item)
  }

  emitRemove(item: CarItem) {
    this.remove.emit(item)
  }



}
