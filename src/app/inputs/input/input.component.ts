import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR:any = {
  provide:NG_VALUE_ACCESSOR,
  useExisting:forwardRef(()=>
    InputComponent
  ),
  multi:true
};


@Component({
  selector: 'em-input',
  providers:[
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
  ],
  template:
  `  
    <div class="el-input-shell">
      <input
        [type]="nativeType"
        class="el-input"
      />
    </div>
    
  `,
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, ControlValueAccessor{
  @Input('type') nativeType:'text'|'number'|'password' = 'text';
  /*@Input('formControlName') ngFormControlName:string = null;*/
  constructor(private fb:FormBuilder) { }
  ngOnInit() {
  }
  writeValue(){

  }

  registerOnChange(){

  }

  registerOnTouched(){

  }
}
