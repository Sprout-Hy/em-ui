import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Provider, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';


const CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioComponent), multi: true
};
const noop = () => {
};

@Component({
  selector: 'em-radio', providers: [CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR], template: `
    <div class="em-radio-shell">
      <label>

        <input
          #emRadio
          type="radio"
          [attr.name]="nativeNam"
          [class]=" 'em-radio ' "
          [checked]="checked"
          [disabled]="disabled"
          [style]="_secureStyle"
          (click)="handleClick($event)"
          (change)="inputChangeHandle($event)"
        />

        <span class="em-radio-delegate">
          <span class="radio-delegate-inr">
            
          </span>
        </span>
      </label>
    </div>
  `, styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit, ControlValueAccessor {
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _value: any = '';
  private _disabled: boolean = false;
  public _secureStyle:SafeStyle = null;

  @ViewChild('emRadio') radioRef:ElementRef;

  @Input('name') nativeNam: string = null;
  @Input('style') nativeStyle:string = null;

  @Input() set checked(val: any) {
    if (this._value != val) {
      this._value = val;
      this._onChangeCallback(val);
    }
  }

  get checked(): any {
    return this._value;
  }

  /**  @Input disabled */
  @Input() set disabled(val: any) {
    this._disabled = val;
  }

  get disabled(): any {
    return this._disabled;
  }



  /**
   * -------------------------
   * Output
   * -------------------------
   */
  @Output() emClick:EventEmitter<any> = new EventEmitter<any>();  //click handle
  @Output() emChange:EventEmitter<any> = new EventEmitter<any>(); //valueChange handle
  @Output() emBlur :EventEmitter<any> = new EventEmitter<any>(); //blur
  @Output() emFocus :EventEmitter<any> = new EventEmitter<any>();
  constructor(private filtration: DomSanitizer) {

  }

  ngOnInit() {
    this._secureStyle = this.setStyle() ;
  }

  /**
   * onChange handle.emit to parentComponent
   * @param event
   */
  public inputChangeHandle(event):void{
    this.emChange.emit(event)
  }


  /** 返回过滤后的css*/
  public setStyle() {

    console.log('__setStyle__');
    console.log(new Date().getTime());
    return this.filtration.bypassSecurityTrustStyle(this.nativeStyle + this.radioRef.nativeElement.style );
  }


  /**
   * implementation ControlValueAccessor
   * @writeValue //设置原生表单控件的值
   */
  writeValue(val: any): void {
    this._value = val;
  }

  /**
   * implementation ControlValueAccessor
   * @registerOnChange //每次原生表单控件值更新时触发的回调函数
   */
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  /**
   * implementation ControlValueAccessor
   * @registerOnTouched
   * */
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }


  /**
   * click handle emit to parentComponent
   * @param event
   */
  public handleClick(event:any){
    this.emClick.emit(event)
  }


}
