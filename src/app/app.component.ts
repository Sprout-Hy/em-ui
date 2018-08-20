import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlertinnerComponent} from './dialog/alertinner/alertinner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  entryComponents:[
    AlertinnerComponent
  ],
})
export class AppComponent implements  OnInit{
  public isDisabledButton:boolean =false;
  title = 'app';
  public ngmodel:any = {text:'',textNative:''};
  public formModule:FormGroup;
  public alerc:any ;
  public compRef:ComponentRef<any>;
  @ViewChild('text') textRef:ElementRef;
  constructor(private fb:FormBuilder,private cfr : ComponentFactoryResolver){
    this.alerc = this.cfr.resolveComponentFactory(AlertinnerComponent);
    /*console.log(this.alerc)*/
    this.formModule = this.fb.group({
      text:['',[]],
      areaL:['',[]],
      check:[],
      check1:[true],
      check2:[],
      date:[''],
      radioA:[],
      radioB:[],
      count:[12],
    });

  }
  ngOnInit(){
    //this.alerc.setTextValue('eric')
    console.log(this.alerc.instance)
  }
  public clickHandle(){
    console.log('click event');
   /* this.isDisabledButton = true*/
    this.formModule.get('text').setValue((Math.random()*100).toString().slice(0,5));
    console.log(this.formModule.get('text').touched)
  }


  public inputClickHandle(e){

  }
  subComponent(){
    return AlertinnerComponent
  }
  public valueChange(event){
    console.log(event.target);
    console.log(this.formModule.value);
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
    console.info(this.formModule.value)
  }

  public dateChangaHandle(event){
    /*console.log("__dateChangaHandle__");
    console.log(event)
    console.log(this.formModule.value)*/
  }

}
