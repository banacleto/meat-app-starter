import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { LoggedInGuard } from './security/loggedin.guard';
import { LoginComponent } from './security/login/login.component';

/**
 * As rotas mais específicas devem vir primeiro e as mais genéricas vêm depois.
 */
const routes: Routes = [
    { path: '', component: HomeComponent },

    /**
     * Rota criada para permitir que o usuário, ao tentar acessar uma rota protegida, seja direcionado para a 
     * tela de login e após se logar com sucesso, seja redirecionado para a tela anterior a de login.
     */
    { path: 'login/:to', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            // Quando eu não informar ninguém, serei redirecionado para o menu e o caminho será '*restaurants/1'
            { path: '', redirectTo: 'menu', pathMatch: 'full' },
            { path: 'menu', component: MenuComponent },
            { path: 'reviews', component: ReviewsComponent }]
    },
    { path: 'restaurants', component: RestaurantsComponent },
    
    /**
     * LoggedInGuard é uma classe que implementa a interface CanLoad para ser um guarda, decidindo se as crianças 
     * podem ser carregadas
     */
    { path: 'order', loadChildren: './order/order.module#OrderModule', canLoad: [LoggedInGuard] },
    { path: 'order-summary', component: OrderSummaryComponent },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    
    /**
     * Declarando uma wildcard route (chamadando página não encontrada). Deve ser declarada sem no final por se tratar da
     * rota mais genérica.
     */
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    /**
     * Realizando o Pré-Carregamento de Todos os Módulos usando a propriedade 'preloadingStrategy'
     * Próxima vez que a nossa aplicação for carregada no browser, os módulos serão carregados
     * logo depois que os módulos principais forem aparecendo, ou seja, os que não são carregados usando
     * lazy-loading. Uma thread rodará em background carregando os demais módulos.
     * 
     * Modificando a Estratégia de Navegação para usar HashLocationStrategy
     * Para saber mais: https://angular.io/guide/router#appendix-locationstrategy-and-browser-url-styles
     */
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }