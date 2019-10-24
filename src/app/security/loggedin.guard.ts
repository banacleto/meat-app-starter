import { Injectable } from '@angular/core';
import { CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { LoginService } from './login/login.service';

/**
 * LoggedInGuard é uma classe que implementa a interface CanLoad e CanActivate para ser um guarda, 
 * decidindo se as crianças podem ser carregadas e quando devem ser carregadas.
 */
@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService) { }

    checkAuthentication(path: string): boolean {
        const loggedIn = this.loginService.isLoggedIn()
        if (!loggedIn) {
            this.loginService.handleLogin(`/${path}`)
        }
        return loggedIn
    }
    
    /**
     * Determina se o usuário pode ou não carregar o módulo de compras, baseado no fato dele estar autenticado
     * ou não.
     */
    canLoad(route: Route): boolean {
        // console.log("canLoad")
        return this.checkAuthentication(route.path)
    }

    /**
     * Este método sempre será sempre chamado quando o módulo já estiver sido carregado e o usuário tentar acessá-lo.
     * 
     * Exemplificando, o método canActivate resolver a seguinte situação: 
     * i. Usuário se autentica;
     * ii. Usuário entra no método canLoad;
     * iii. Usuário faz logoff;
     * iv. Usuário tentar entrar novamente sem estar autenticado e acessa a rota uma vez que o módulo de compras
     * já foi carregado e não será mais carregado.
     */
    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        // console.log("canActivate")
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }
}
