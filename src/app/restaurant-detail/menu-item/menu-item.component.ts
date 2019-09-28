import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('menu-item-appeared', [ // O nome da trigger é o nome da animação
      state('ready', style({ opacity: 1 })), // Definindo um estado e o estilo relacionado a esse estado
      transition('void => ready', [ // Declarando uma transição de um estado que não está na arvore de componentes para quando ele entra nela
        style({ opacity: 0, transform: 'translateY(-20px)' }), // Aplicando um estilo na transição
        animate('300ms 0s ease-in') // Definindo como vai ser a nossa animação (duração, delay, tipo)
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  menuItemState = 'ready'
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
