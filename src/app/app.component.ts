import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isDisabledButton:boolean =false;
  title = 'app';
  public formModule:FormGroup;
  constructor(private fb:FormBuilder){
    this.formModule = this.fb.group({
      text:['12312',[]],
    })
  }

  public clickHandle(){
    console.log('click event');
   /* this.isDisabledButton = true*/
  }
}
