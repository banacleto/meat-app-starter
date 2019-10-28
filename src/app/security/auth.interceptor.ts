import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    /**
     * O Injector é referência para o mecanismo de injeção de independência do angular. Através do Injector,
     * pode-se obter qualquer objeto que esteja registrado dentro do container de injeção de dependência.
     */
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginService = this.injector.get(LoginService)
        if (loginService.isLoggedIn()) {
            const authRequest = request.clone({ 
                setHeaders: { 'Authorization': `Bearer ${loginService.user.accessToken}` } 
            })
            return next.handle(authRequest)
        } else {
            return next.handle(request)
        }
    }
}