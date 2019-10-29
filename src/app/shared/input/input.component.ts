import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';

/**
 * (I) Precisamos pegar uma referência NgModel que vai ser declarada no futuro, por quem estiver usando o meu
 * componente, vai ficar como filho do meu componente. Sempre que referenciamos um tipo, devemos importar 
 * aquele tipo. Dessa forma, referenciamos NgModel.
 */
import { NgModel, FormControlName } from '@angular/forms'

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label: string
  @Input() errorMessage: string
  @Input() showTip: boolean = true

  input: any

  /**
   * (II) Com o parâmetro do ContentChild() podemos colocar uma referência a um elemento ou a uma diretiva. No nosso
   * caso, estamos usando como parâmetro a diretiva NgModel, e chamamos de model, onde o tipo dela será NgModel.
   */
  @ContentChild(NgModel) model: NgModel
  @ContentChild(FormControlName) control: FormControlName

  constructor() { }

  ngOnInit() {
  }

  /**
   * (III) Esse método será chamado exatamente quando o conteúdo for definido, ou seja, o conteúdo que vai ficar no lugar
   * de ng-content quando este for definido. Então, assim que alguém apresentar esse conteúdo, será exatamento o
   * momento que a gente precisa para checar se ngModel existe e também o momento em que pegaremos uma referência
   * a ngModel e atribuir ao nosso input.
   */
  ngAfterContentInit() {
    this.input = this.model || this.control

    // Verificando se no conteúdo que está sendo informado para a gente, existe a tag ngModel lá
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName')
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }


}
