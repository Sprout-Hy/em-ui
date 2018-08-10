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
      text:['',[]],
    })
  }

  public clickHandle(){
    console.log('click event');
   /* this.isDisabledButton = true*/
    this.formModule.get('text').setValue((Math.random()*100).toString().slice(0,5))
  }


  public inputClickHandle(e){

  }

  public valueChange(){

  }

}
