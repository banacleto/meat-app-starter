import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { OrderComponent } from './order/order.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: 'restaurants', component: RestaurantsComponent },
    {
        path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            { path: '', redirectTo: 'menu', pathMatch: 'full' }, // Quando eu não informar niguém, serei redirecionado para o menu e o caminho será '*restaurants/1'
            { path: 'menu', component: MenuComponent },
            { path: 'reviews', component: ReviewsComponent }]
    },
    { path: 'order', component: OrderComponent },
    { path: 'order-summary', component: OrderSummaryComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }