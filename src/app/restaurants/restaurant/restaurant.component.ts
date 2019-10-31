import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Restaurant } from './restaurant.model';


@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    // O nome da trigger é o nome da animação
    trigger('restaurant-appeared', [
      // Definindo um estado e o estilo relacionado a esse estado
      state('ready', style({ opacity: 1 })),
      // Declarando uma transição de um estado que não está na arvore de componentes para quando ele entra nela
      transition('void => ready', [
        // Aplicando um estilo na transição
        style({ opacity: 0, transform: 'translate(-30px, -10px)' }),
        // Definindo como vai ser a nossa animação (duração, delay, tipo)
        animate('300ms 0s ease-in-out')
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
