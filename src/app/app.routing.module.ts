import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: 'restaurants', component: RestaurantsComponent },
    {
        path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            // Quando eu não informar niguém, serei redirecionado para o menu e o caminho será '*restaurants/1'
            { path: '', redirectTo: 'menu', pathMatch: 'full' },
            { path: 'menu', component: MenuComponent },
            { path: 'reviews', component: ReviewsComponent }]
    },
    { path: 'order', loadChildren: './order/order.module#OrderModule' },
    { path: 'order-summary', component: OrderSummaryComponent }
];

@NgModule({
    /**
     * Realizando o Pré-Carregamento de Todos os Módulos usando a propriedade 'preloadingStrategy'
     * Próxima vez que a nossa aplicação for carregada no browser, os módulos serão carregados
     * logo depois que os módulos principais forem aparecendo, ou seja, os que não são carregados usando
     * lazy-loading. Uma thread rodará em background carregando os demais módulos.
     */
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }