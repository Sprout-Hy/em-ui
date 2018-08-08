import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Provider} from '@angular/core/src/di';
import {DomSanitizer} from '@angular/platform-browser';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR:Provider = {
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
    <div class="el-input-shell" [style]="setStyle()" >
      <input
        [type]="nativeType"
        class="el-input"
        [placeholder]="placeholder"
        [value]="nativeValue" 
      />
    </div>
    
  `,
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, ControlValueAccessor{
  /*@Input*/
  @Input('type') nativeType:'text'|'number'|'password' = 'text';
  @Input() placeholder:string = '';
  @Input('value') nativeValue:any;
  @Input() style:string ='';
  constructor(private fb:FormBuilder,private filtration:DomSanitizer) { }
  ngOnInit() {
  }
  writeValue(){

  }

  registerOnChange(){

  }

  registerOnTouched(){

  }

  public setStyle(){
    return this.filtration.bypassSecurityTrustStyle(this.style)
  }
}
