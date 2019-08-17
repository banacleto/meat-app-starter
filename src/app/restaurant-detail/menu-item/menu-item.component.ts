import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestaurantService } from 'app/restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItem
  @Output() add = new EventEmitter

  constructor() { }

  ngOnInit() {
  }

  /**
   * Quando um evento é emitido dizendo que o menuItem foi clicado, o componente pai (menu) vai poder associar uma ação e fazer alguma 
   * coisa para mim. O componente interno (menu-item) não precisa se preocupar com isso, a unica coisa que ele tem que criar é a semântica 
   * do evento. Ou seja, alguem clicou no meu link 'adicionar' e por isso estou te notificando, está aqui o objeto que foi clicado e você pode 
   * fazer alguma coisa.
   */
  emitAddEvent() {
    this.add.emit(this.menuItem)
  }

}
