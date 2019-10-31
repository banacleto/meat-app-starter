import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';

// Definindo o componente padrão que o módulo deve carregar uma vez que ele é carregado.
const routes: Routes = [{ path: '', component: AboutComponent }]

/**
 * Para criarmos o módulo AboutModule, devemos retirar de dentro do módulo raiz AppModule o AboutComponent.
 * Para isso devemos:
 * 1. Remover o componente da lista de declarações => declarations: [ ..., AboutComponent, ... ]
 * 2. Remover o import => import { AboutComponent } from './about/about.component';
 *
 * Feito isso, poderiamos importar o módulo AboutModule na lista de imports: [ ... ] no módulo raiz,
 * mas os componentes seriam carregados da mesma forma que os componentes declarados no módulo raiz,
 * ou seja, não ganhando nada com o lazy-loading apenas com organização.
 *
 */
@NgModule({
    /**
     * Na lista de 'declarations' devem conter todos os componentes que teremos dentro do módulo;
     * Não precisamos colocar nada na lista de 'exports', uma vez que componente AboutComponent
     * só é utilizado dentro desse módulo.
     * No Angular, o lazy-loading é fornecido através de um outro módulo que é o módulo RouterModule.
     * É no módulo de rotas que fazemos o lazy-loading. Configuramos ele para quando acionarmos
     * a rota é que ele vai realmente carregar aquele módulo naquele momento. Ao invés de usar proriedade
     * 'component' usamos a própriedade 'loadChildren'. Para isso devemos:
     *
     * 1. Remover a referência import { AboutModule } from './about/about.component';
     * 2. Fazer a seguinte mudança..Onde tem:
     * const routes: Routes = { ..., path: '', component: AboutComponent, ... }
     *
     * Substituir por:
     * const routes: Routes = { ..., path: '', loadChildren: './about/about.module#AboutModule', ... }
     *
     * Observação: ver 'app.routing.module.ts'
     *
     * Feito isso, da mesma forma que fizemos no módulo de rotas para importar o componente usando o método
     * 'forRoot', devemos fazer aqui usando o método 'forChild' de RootModule, passando uma referência das
     * rotas para este módulo filho.
     */
    declarations: [AboutComponent],

    // Importanto as dependências do nosso módulo
    imports: [RouterModule, RouterModule.forChild(routes)]
})
export class AboutModule { // Exemplo de Feature Module. Este módulo é declarado como lazy-loading.
}
