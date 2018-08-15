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
  public ngmodel:any = {text:'',textNative:''};
  public formModule:FormGroup;
  constructor(private fb:FormBuilder){
    this.formModule = this.fb.group({
      text:['',[]],
      areaL:['',[]],
      check:[true],
      date:['']
    })
  }

  public clickHandle(){
    console.log('click event');
   /* this.isDisabledButton = true*/
    this.formModule.get('text').setValue((Math.random()*100).toString().slice(0,5));
    console.log(this.formModule.get('text').touched)
  }


  public inputClickHandle(e){

  }

  public valueChange(event){
    console.log(event.target);
    console.log(this.formModule.value);
    console.log(this.ngmodel)
  }

  public textareaChange(){
    console.log(this.ngmodel.textNative)
  }

  public checkChange(event){
   /* console.log('__checkChange__');*/
    console.log(this.formModule.value);
    /*console.log(event.target.checked)*/
  }

  public radioChangeHandle(event){
    console.log(event.target.value)
  }

  public dateChangaHandle(event){
    console.log("__dateChangaHandle__");
    console.log(event)
    console.log(this.formModule.value)
  }

}
