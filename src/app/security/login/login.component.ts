import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'app/shared/messages/notification.service';
import { LoginService } from './login.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string

  constructor(private notificationService: NotificationService, private fb: FormBuilder,
    private loginService: LoginService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    })

    /**
     * Se alguem chamar a nossa tela de login e não passar nenhuma rota, seremos direcionado para a tela principal
     */
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/') // btoa(str): enconding the str in base64
  }

  login() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(user => this.notificationService.notify(`Bem vindo, ${user.firstName}`),
        response => this.notificationService.notify(response.error.msg),
        () => { this.router.navigate([atob(this.navigateTo)]) }) // atob(str): decoding the str
  }
}
