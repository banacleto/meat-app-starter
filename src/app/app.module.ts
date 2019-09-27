import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    
    // Importando o SharedModule + providers: [ShoppingCartService, RestaurantService, OrderService]
    SharedModule.forRoots(),
    BrowserAnimationsModule
  ],
  providers: [
    /**
     * Este tipo de notação é um modelo extendido da declaração de providers acima. Quando usamos RestaurantServive, 
     * na verdade estamos dizendo: { provide: RestaurantService, useClass: RestaurantService }
     * Mas para não ficar muito verboso, usamos a sintaxe reduzida. O que estamos fazendo com o LOCALE_ID é uma
     * sintaxe mais extendida, onde sempre que um componente pedir o token LOCALE_ID, ele vai receber o valor 'pt-BR'.
     * Observação: ver os imports nos arquivos package.json e polyfills.js
     */
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
