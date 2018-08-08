import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent2} from './fmct';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  declarations: [
    InputComponent,
    InputComponent2,
  ],
  exports:[
    InputComponent,
  ],
  entryComponents:[
    InputComponent,
  ],
})
export class InputsModule { }
