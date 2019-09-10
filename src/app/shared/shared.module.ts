import { CommonModule } from "@angular/common"; // Módulo que possui as diretivas básicas (importado automaticamente pelo BrowserModule)
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";


@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, RadioComponent, RatingComponent,
        CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule { }