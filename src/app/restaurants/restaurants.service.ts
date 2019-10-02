import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"

import { Restaurant } from "./restaurant/restaurant.model";
import { MEAT_API } from "./../app.api";
import { ErrorHandler } from "app/app.error-handler";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";

/**
 * Assim como a gente criou o serviço 'RestaurantService' e injetou dentro do componente 'RestaurantsComponent',
 * o Angular também fornece alguns serviços em que a gente pode injetar nos nossos componentes e também nossos
 * serviços. Um deles é o serviço Http. Para uma classe de serviço receber um outro serviço via injeção de dependência,
 * a gente precisa marca-la com o decorator @Injectable(). Não precisamos incluir o decorator @Injectable se a nossa
 * classe não vai acessar nenhum serviço Http. Mas nesse caso, como a gente vai receber um serviço, precisamos marcar
 * como @Injectable(). Precisamos importar o decorator @Injectable(), importar o serviço Http do módulo Http do Angular.
 * 
 */
@Injectable()
export class RestaurantService {

  // Recebendo a injeção do serviço http
  constructor(private http: Http) { }

  // Configuração do Observable: Consumindo a API mockada do json-server
  restaurants(search?: string): Observable<Restaurant[]> { // atributo 'search?' é definido como opcional para não quebrar os outros métodos que não passam valores.
    return this.http.get(`${MEAT_API}/restaurants`, { params: { q: search } }) // até aqui o retorno é do tipo Observable<Response> (resposta crua: status, mensagens ok/erro, corpo...)
      .map(response => response.json()) // transformando (map) o objeto Observable<Response> num array de restaurantes (Observable<Restaurant[]>)
      // A chamada http não será feita nesse momento, precisamos primeiro fazer um subscribe. Apenas depois que fizermos um subscribe é que a 
      // requisição será feita. Dessa forma, o subscribe será feito no componente 'RestaurantsComponent'.
      .catch(ErrorHandler.errorHandler)
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get(`${MEAT_API}/restaurants/${id}`)
      .map(response => response.json())
      .catch(ErrorHandler.errorHandler)
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
      .map(response => response.json())
      .catch(ErrorHandler.errorHandler)
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
      .map(response => response.json())
      .catch(ErrorHandler.errorHandler)
  }
}