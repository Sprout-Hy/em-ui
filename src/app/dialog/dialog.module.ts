import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogComponent} from './dialog.component';
import { AlertinnerComponent } from './alertinner/alertinner.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DialogComponent,
    AlertinnerComponent,
  ],
  entryComponents:[
    DialogComponent,
    AlertinnerComponent
  ],
  exports:[
    DialogComponent,
  ]

})
export class DialogModule { }
