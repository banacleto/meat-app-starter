import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { OrderComponent } from './order.component';

/**
 * O Route Guard CanDeactivate dá chance da aplicação perguntar ao usuário se ele quer desistir de estar numa
 * página (estar com aquele componente ativado) ou ir para uma outra página, ou seja ativando outro componente
 * através da navegação.
 *
 * Passos para utilizar o Route Guard CanDeactivate:
 * 1. Criar a classe 'LeaveOrderGuard';
 * 2. Declarar como provider (ver SharedModule);
 * 3. E associar na rota que, ao invés de ter loadChildren, tenha associada ao componente (ver OrderModule).
 */
export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {
    canDeactivate(orderComponent: OrderComponent, currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot): boolean {
        if (!orderComponent.isOrderCompleted()) {
            return window.confirm('Deseja realmente desistir da compra?')
        } else {
            return true
        }
    }
}
