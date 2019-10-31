import { NgModule } from '@angular/core';
import { OrderService } from 'app/order/order.service';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { RestaurantService } from 'app/restaurants/restaurants.service';

/**
 * Módulo obsoleto. Ver SharedModule (shared/shared.module.ts) usando ModuleWithProviders.
 *
 * A idéia do core-module é termos um módulo isolado aonde vamos ter todos os providers da aplicação
 * nesse módulo que só será importado no módulo raiz evitando que algum serviço seja declarado na lista
 * de providers de um módulo que seja carregado tardiamente, passando a termos uma instância a mais daquele
 * serviço no contexto de injeção de dependência da aplicação. O HttpModule é um exemplo de core-module.
 */
@NgModule({
    /**
     * Os providers que estão na lista de providers de um módulo que é carregado tardiamente, têm um contexto
     * de injeção de dependências isolado do restante da aplicação.
     */
    providers: [ShoppingCartService, RestaurantService, OrderService]
})
export class CoreModule { }
