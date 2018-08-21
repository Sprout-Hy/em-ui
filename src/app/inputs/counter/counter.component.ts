import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputComponent} from '../input/input.component';
import {DomSanitizer} from '@angular/platform-browser';
import {Provider} from '@angular/core/src/di';


const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CounterComponent),
  multi: true
};

const noop = () => {
};


@Component({
  selector: 'em-counter',
  template: `
    <div class="em-counter-shell">
      
      <span class="counter-btn btn-minus" (click)="countChangeHandle( -1 )">
        <i class=" iconfont icon-minus"></i>
      </span>

      <div class="counter-inner">
        <input type="number"
               #nativeInput
               [name]="nativeName"
               [class]="  'em-input em-input-inner'+ className "
               [placeholder]="placeholder"
               [(ngModel)]="value"
               [disabled]="disabled"
               [readonly]="readonly"
               [id]="nativeId"
               (click)="handleClick($event)"
               (change)="inputChangeHandle($event)"
               (blur)="inputBlurHandle($event)"
               (focus)="inputFocusHandle($event)"
        >
      </div>

      <span class="counter-btn btn-add" (click)="countChangeHandle(1)">
        <i class="iconfont icon-add"></i>
      </span>

    </div>
  `,
  styleUrls: ['./counter.component.scss'],
  providers:[
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
  ],
})
export class CounterComponent extends InputComponent implements OnInit,ControlValueAccessor {

  /**  @Input disabled */
  @Input() set disabled(val: any) {
    this._disabled = val;
  }
  get disabled(): any {
    return this._disabled;
  }


  @Input() set value(val: any) {
    if (val != this._value) {
      !val||val<0?val=1:null;
      this._value = val;
      this._onChangeCallback(val);//更新组件外formControl
    }
  }
  get value() {
    return this._value;
  }

  @Input() set readonly(val: any) {
    this._readonly != val ? this._readonly = val : null;

  }

  get readonly(): any {
    return this._readonly;
  }

  constructor(public filtration: DomSanitizer) {
    super(filtration)
  }

  ngOnInit() {
  }

  // 按钮点击更新计数器
  public countChangeHandle(num:number){
    //let value = this.inputRef.nativeElement.value || 0;
    console.log(num);
    this._value+num>0 ? this._value+=num:this._value=1;
    this.inputRef.nativeElement.value = this._value;
    this._onChangeCallback( this._value);
    this.emChange.emit(this._value);

  }




}
