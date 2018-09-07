import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlertinnerComponent} from './dialog/alertinner/alertinner.component';
import {DialogComponent} from './dialog/dialog.component';
import {SelectOptions_} from './inputs/select/select.component';

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
  public alerc:any =null;
  public compRef:ComponentRef<any>;

  public selects= [];

  public cascadeData: Array<SelectOptions_>  = null;


  @ViewChild('text') textRef:ElementRef;
  constructor(private fb:FormBuilder,private cfr : ComponentFactoryResolver){

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
      select:[]
    });

    this.cascadeData = [

      {
        label: '选项01-1dddddddddd', value: '1--', children: [{
          label: '选项1-2-1',
          value: '1-2-1',
          children: [
            {label: '选项1-3-1', value: '1-2-1', children: []},
            {label: '选项1-3-2', value: '1-2-2', children: []},]
        },
          {
            label: '选项02-2',
            value: '2-2',
            children: []
          },
        ]
      },
      {
        label: '选项01', value: '111', children: [{
          label: '选项02-1',
          value: '2-1',
          children: [
            {label: '选项3-1', value: '2-1', children: []},
            {label: '选项3-2', value: '2-2', children: []},]
        },
          {
            label: '选项02-2',
            value: '2-2',
            children: []
          },
        ]
      },
    ];

  }
  ngOnInit(){

  /*  this.alerc = {
      component:this.cfr.resolveComponentFactory(AlertinnerComponent),
      inputs:{
        className:'test',
      }
    };*/

    /*setInterval(()=>{
      this.setRandomvalue()
    },1000)*/

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
    /*console.log(event.target);
    console.log(this.formModule.value);*/
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
  @ViewChild('alertContrl') alertCtrl:DialogComponent;
  public toggle(){

    if ( !this.alertCtrl.show) {
      this.alerc = {
        component:this.cfr.resolveComponentFactory(AlertinnerComponent),
        inputs:{
          className:'test',
        }
      };
      this.alertCtrl.viewPresent()
    }
    this.alertCtrl.show = !this.alertCtrl.show;

  }

  public selectChange(event){
    console.log(event)
  }


  public select2ClickHandle(event){
    console.log(event)
  }

  setRandomvalue(){
    this.formModule.get('select').setValue(String(Math.random()*10).slice(0,5))
  }

}
