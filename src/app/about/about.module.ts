import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';

// Definindo o componente padrão que o módulo deve carregar uma vez que ele é carregado
const routes: Routes = [{ path: '', component: AboutComponent }]

@NgModule({
    declarations: [AboutComponent],
    imports: [RouterModule, RouterModule.forChild(routes)]
})
export class AboutModule { }