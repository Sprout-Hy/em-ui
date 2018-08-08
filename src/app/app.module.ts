import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ButtonModule} from './button/button.module';
import {EmModule} from './em.module';
import {InputsModule} from './inputs/inputs.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    EmModule,
    InputsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
