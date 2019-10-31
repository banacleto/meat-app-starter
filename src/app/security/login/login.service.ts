import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MEAT_API } from 'app/app.api';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()
export class LoginService {

    user: User
    lastUrl: string

    constructor(private http: HttpClient, private router: Router) {
        /**
         * Pegando a ultima url antes de entrar na tela de login
         */
        this.router.events.pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => this.lastUrl = e.url)
    }

    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${MEAT_API}/login`, { email: email, password: password })
            .pipe(tap(user => this.user = user))
    }

    // Descartando o usuário
    logout() {
        this.user = undefined
    }

    /**
     * Rota: /login/order -> LoginComponent
     * app.routing.module.ts: { path: 'login/:to', component: LoginComponent }
     *
     * Se ninguem não passar nenhum parâmetro, o método irá receber a última url
     * que o usuário está.
    */
    handleLogin(path: string = this.lastUrl) {
        this.router.navigate(['/login', btoa(path)]) // btoa(str):
    }
}
