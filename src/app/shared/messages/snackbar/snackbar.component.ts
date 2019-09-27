import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Help!'
  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    // this.notificationService.notifier.subscribe(message => {
    //   this.message = message
    //   this.snackVisibility = 'visible'
    //   Observable.timer(3000).subscribe(timer=> this.snackVisibility = 'hidden')
    // })

    /**
     * Logo abaixo temos o refactoring para tornar os observables independentes entre si, colocando-os numa única configuração:
     * a) O operador 'do' nos permite realizar uma operação na cadeia, ou seja, ao receber uma mensamgem será realizado uma determinada ação;
     * b) O operador 'switchMap' troca os eventos que seriam emitidos. Assim como o operador 'map' troca a mensagem, o 'switchMap' troca o observable, 
     * e além de trocar o Observable, o 'switchMap' ainda faz o unsubscribe se quando uma nova mensagem chegar o Observable antigo ainda estiver ativo.
     */
    this.notificationService.notifier
      .do(message => {
        this.message = message
        this.snackVisibility = 'visible'
      }).switchMap(message => Observable.timer(1500))
      .subscribe(timer => this.snackVisibility = 'hidden')
  }

}
