import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0, // colocando a search-bar como invisível, escondida
        "max-height": "0px" // zerando a altura da search-bar, aproximando o título superior da lista de restaurantes
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px" // corrigindo o espaçamento entre o título superior e a search-bar
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]

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
  //providers: [RestaurantService]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden' // propriedade do componente para controlar a visibilidade da search-bar
  restaurants: Restaurant[]
  searchForm: FormGroup // propriedade que representa o formulário
  searchControl: FormControl // propriedade que representa o input-text

  // Injetando a classe de serviço RestaurantService dentro do componente
  constructor(private restaurantServices: RestaurantService, private formBuilder: FormBuilder) { }

  /**
   * Sempre que a gente criar um componente com o angular-cli, automaticamente o componente implementa a interface 'OnInit'. 
   * O método 'ngOnInit()' será chamado uma vez durante o ciclo de vida do componente. Então, sempre que o nosso componente 
   * entrar na tela, quando todas as injeções, todas as dependências tiverem sido atribuidas imediatamente o angular irá chamar 
   * o método 'ngOnInit()'.
   *  
   */
  ngOnInit() {
    this.searchControl = this.formBuilder.control('') // inicializando o searchControl com texto vazio
    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      // O proximo passo é começar a ouvir o que o usuário vai digitar através da propriedade 'searchControl.
      .debounceTime(500) // ignora qualquer digitação que for realizada num tempo inferior a 500ms
      .distinctUntilChanged() // uma pesquisa tem que ser diferente de uma próxima pesquisa
      //.do(searchTerm => console.log(searchTerm)) // usado somente para logar o resultado das operações no console
      .switchMap(searchTerm => this.restaurantServices.restaurants(searchTerm)) // quando chega uma nova mensagem o switchMap faz o ubsubscribe da anterior
      .subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantServices.restaurants() // como o serviço está retornando um Observable...
      .subscribe(restaurants => this.restaurants = restaurants) // ... precisamos fazer um subscribe
    // Essa operação acontece de forma assincrona. 
    // Resumindo: O componente será instanciado, as dependências são atribuidas que é o 'RestaurantService'.
    // No método ngOnInit(), no momento que fizermos o subscribe a requisição http vai ser feita, a resposta vai chegar, 
    // ela vai ser mapeada para o json da resposta, retornando um array de restaurantes que será recebido neste listener,
    // que seria a lista de restaurantes, para depois pegar essa lista e jogar na propriedade restaurants.
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
