import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { LoginService } from './login/login.service';

/**
 * LoggedInGuard é uma classe que implementa a interface CanLoad para ser um guarda, decidindo se as crianças 
 * podem ser carregadas
 */
@Injectable()
export class LoggedInGuard implements CanLoad {

    constructor(private loginService: LoginService) { }

    canLoad(route: Route): boolean {
        const loggedIn = this.loginService.isLoggedIn()
        
        if(!loggedIn) {
            this.loginService.handleLogin(`/${route.path}`)
        }

        return loggedIn
    }
}
