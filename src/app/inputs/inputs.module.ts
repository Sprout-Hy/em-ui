import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent2} from './fmct';
import { TextareaComponent } from './textarea/textarea.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  declarations: [
    InputComponent,
    InputComponent2,
    TextareaComponent,
  ],
  exports:[
    InputComponent,
    TextareaComponent,
  ],
  entryComponents:[
    InputComponent,
  ],
})
export class InputsModule { }
