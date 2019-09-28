import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Restaurant } from './restaurant.model';


@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('restaurant-appeared', [ // O nome da trigger é o nome da animação
      state('ready', style({ opacity: 1 })), // Definindo um estado e o estilo relacionado a esse estado
      transition('void => ready', [ // Declarando uma transição de um estado que não está na arvore de componentes para quando ele entra nela
        style({ opacity: 0, transform: 'translate(-30px, -10px)' }), // Aplicando um estilo na transição
        animate('300ms 0s ease-in-out') // Definindo como vai ser a nossa animação (duração, delay, tipo)
      ])
    ])
  ]
})
export class RestaurantComponent implements OnInit {

  // O estado inicial é 'ready' porque a transição que nos interessa é de 'void => ready'
  restaurantState = 'ready'
  @Input() restaurant: Restaurant

  constructor() { }

  ngOnInit() {
  }

}
