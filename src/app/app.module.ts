import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {ButtonModule} from './button/button.module';
import {InputsModule} from './inputs/inputs.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from './dialog/dialog.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputsModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
