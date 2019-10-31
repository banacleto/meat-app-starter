import { CommonModule } from '@angular/common'; // Módulo que possui as diretivas básicas (importado automaticamente pelo BrowserModule)
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveOrderGuard } from 'app/order/leave-order.guard';
import { OrderService } from 'app/order/order.service';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { RestaurantService } from 'app/restaurants/restaurants.service';
import { AuthInterceptor } from 'app/security/auth.interceptor';
import { LoggedInGuard } from 'app/security/loggedin.guard';
import { LoginService } from 'app/security/login/login.service';
import { InputComponent } from './input/input.component';
import { NotificationService } from './messages/notification.service';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { RadioComponent } from './radio/radio.component';
import { RatingComponent } from './rating/rating.component';


@NgModule({
    // Declarando todos os componentes que teremos dentro do módulo
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],

    // Importanto as dependências do nosso módulo
    imports: [CommonModule, FormsModule, ReactiveFormsModule],

    /**
     * A propriedade 'exports' nos permite informar quais são os componentes de dentro do nosso
     * módulo que queremos que sejam utilizados por outros módulos. O fato dos módulos CommonModule,
     * FormsModule e ReactiveFormsModule estarem declarados aqui serve apenas para mostrar que podemos
     * enxugar a configuração dos outros módulos também, que nosso caso seria o AppModule (raiz).
     */
    exports: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent,
        CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule { // Exemplo de Shared Module. Este módulo é inicializado junto com o módulo raiz.
    static forRoots(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ShoppingCartService, RestaurantService, OrderService,
                NotificationService, LoginService, LoggedInGuard, LeaveOrderGuard,
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
            ]
        }
    }
}
