import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent2} from './fmct';
import { TextareaComponent } from './textarea/textarea.component';
import { CheckboxComponent } from './checkbox/checkbox.component';

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
    CheckboxComponent,
  ],
  exports:[
    InputComponent,
    TextareaComponent,
    CheckboxComponent
  ],
  entryComponents:[
    InputComponent,
  ],
})
export class InputsModule { }
