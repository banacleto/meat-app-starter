import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',

 /**
  * No geral, são três os escopos que podem ser usados para se declarar um serviço.
  * São eles: 
  * Módulo Angular: Os serviços ficam disponíveis para todas sa classes declaradas nesse módulo, incluíndo componentes e serviços);
  * Componente Angular: O serviço será instânciado e compartilhado apenas para o componente e seus filhos;
  * Somente componente: Se declarado na lista de 'viewProviders: []', o serviço fica disponível apenas para o componente. Os componentes
  * filhos não terão acesso a essa instância.
  * 
  * Serviços podem solicitar a injeção de outros serviços através do decorator @Injectable (from @angular/core). Esta diretiva não é
  * necessária para que serviço possa ser injetado em outro objeto e sim apenas para receber injeções do framework.
  * 
  * Exemplos de serviços disponíveis: Title, Http e Router
  * 
  */
  providers: [ RestaurantService ]
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[] = []

  // Injetando a classe de serviço RestaurantService dentro do componente
  constructor(private restaurantServices: RestaurantService) { }

  /**
   * Sempre que a gente criar um componente com o angular-cli, automaticamente o componente implementa a interface 'OnInit'. 
   * O método 'ngOnInit()' será chamado uma vez durante o ciclo de vida do componente. Então, sempre que o nosso componente 
   * entrar na tela, quando todas as injeções, todas as dependências tiverem sido atribuidas imediatamente o angular irá chamar 
   * o método 'ngOnInit()'.
   *  
   */
  ngOnInit() {
    this.restaurants = this.restaurantServices.restaurants()
  }

}
