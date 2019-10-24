import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { MEAT_API } from "app/app.api";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { Observable } from "rxjs/Observable";
import { User } from "./user.model";

@Injectable()
export class LoginService {

    user: User
    lastUrl: string

    constructor(private http: HttpClient, private router: Router) {
        /**
         * Pegando a ultima url antes de entrar na tela de login
         */
        this.router.events.filter(e => e instanceof NavigationEnd)
            .subscribe((e: NavigationEnd) => this.lastUrl = e.url)
    }

    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${MEAT_API}/login`, { email: email, password: password })
            .do(user => this.user = user)
    }

    // Descartando o usuário
    logout() {
        this.user = undefined
    }

    /**
     * Rota: /login/order -> LoginComponent
     * app.routing.module.ts: { path: 'login/:to', component: LoginComponent }
    */
    handleLogin(path: string = this.lastUrl) {
        this.router.navigate(['/login', btoa(path)]) // btoa(str): 
    }
}