import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestaurantService } from 'app/restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) { }

  // O subscribe não foi feito aqui, pois ficou decidido que usariamos o pipe async para tal funcão.
  ngOnInit() {
    // O detalhe do restaurante tem o caminho /restaurants/id, então a rota que é acionada é diretamente para aquele componente.
    // Aqui, estamos num componte filho, ou seja, é uma subrota e o parâmetro não é desse componente e sim do componente parent.
    // Dessa forma, vamos ter que acessar esse dado através de um objeto chamado de parent da rota.
    this.reviews = this.restaurantService
      .reviewsOfRestaurant(this.route.parent.snapshot.params['id'])
  }

}
