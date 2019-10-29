import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";
import { Observable } from "rxjs";
import { MEAT_API } from "./../app.api";
import { Restaurant } from "./restaurant/restaurant.model";

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

  // Recebendo a injeção do serviço HttpClient
  constructor(private http: HttpClient) { }

  restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined
    
    if(search) {
      params = new HttpParams().append('q', search)
    }

    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, { params: params })
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
  }
}