import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';
import { LeaveOrderGuard } from './leave-order.guard';
import { OrderItemsComponent } from './order-items/order-items.component';
import { OrderComponent } from './order.component';

const routes: Routes = [
    { path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard] }
]

@NgModule({
    /**
     * Declarando todos os componentes que teremos dentro do módulo.
     * Como os componentes OrderComponent, OrderItemsComponent, DeliveryCostsComponent
     * só são utilizados dentro deste módulo, não precisamos exportá-los. Só precisamos
     * exportar os componentes que serão utilizados por outros módulos.
     */
    declarations: [OrderComponent, OrderItemsComponent, DeliveryCostsComponent],

    /**
     * Importanto as dependências do nosso módulo. Não precisamos mais importar os módulos
     * CommonModule, FormsModule e ReactiveFormsModule pois eles já estão incluídos no SharedModule,
     * ou seja, eles estão sendo exportados pelo SharedModule.
     * Uma observação interessante que podemos fazer aqui é que não estamos importamos o módulo
     * RouterModule como fizemos no AboutModule. Uma vez que importamos RouterModule.forChild(routes),
     * já está sendo importado o módulo RouterModule incluindo as rotas, ou seja, fica sendo desnecessário
     * importar novamente o RouterModule.
     */
    imports: [SharedModule, RouterModule.forChild(routes)]
})
export class OrderModule { // Exemplo de Feature Module. Este módulo é declarado como lazy-loading.
}
