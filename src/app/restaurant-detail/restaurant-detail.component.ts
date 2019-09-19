import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestaurantService } from 'app/restaurants/restaurants.service';
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant

  constructor(
    private restaurantServices: RestaurantService,
    private route: ActivatedRoute // fornece qual URL foi acionada e quais os parâmetros que foram passados para URL
  ) { }

  ngOnInit() {
    this.restaurantServices.restaurantById(this.route.snapshot.params['id'])
      .subscribe(restaurant => this.restaurant = restaurant) // recebendo do Observable um restaurante e passando-o para a propriedade local
  }

}
