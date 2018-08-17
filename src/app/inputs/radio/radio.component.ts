import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Provider, Renderer2, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';


const CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioComponent),
  multi: true
};
const noop = () => {
};

@Component({
  selector: 'em-radio',

  template: `
    <div class="em-radio-shell">
      <label>

        <input
          ngModel
          #emRadio
          type="radio"
          hidden
          [attr.name]="nativeName"
          [class]=" 'em-radio '+ className "
          [style]="_secureStyle"
          [(ngModel)]="checked"
          [checked]="checked"
          [disabled]="disabled"
          [attr.value]="nativeValue"
          (change)="inputChangeHandle($event)"
        />

        <span class="em-radio-delegate">
          <span class="radio-delegate-inr">
            
          </span>
        </span>
      </label>
    </div>
  `,
  styleUrls: ['./radio.component.scss'],
  host:{ '(change)':'onChange'},
  providers: [
    CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR
  ],
})
export class RadioComponent implements OnInit, ControlValueAccessor {
  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;
  private _value: any = '';
  private _disabled: boolean = false;


  public _secureStyle:SafeStyle = null;
  @ViewChild('emRadio') radioRef:ElementRef;

  /**
   * -----------------
   * 输入属性 @Input
   * -----------------
   */
  @Input('style') nativeStyle:string ='';
  @Input('class') className:string = '';
  @Input('name') nativeName:string = '';
  @Input('id') nativeId:string = '';
  @Input('value') nativeValue:any = '';
  @Input() set checked(val: any) {
    console.log(val);
    if (this._value != val) {
      this._value = val;
      this.onChange(val);
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
 /* @Output() emBlur :EventEmitter<any> = new EventEmitter<any>(); //blur
  @Output() emFocus :EventEmitter<any> = new EventEmitter<any>();*/
  constructor(private filtration: DomSanitizer,private _renderer:Renderer2, private _elementRef:ElementRef) {

  }

  ngOnInit() {
    this._secureStyle = this.setStyle() ;
  }

  /**
   * onChange handle.emit to parentComponent
   * @param event
   */
  public inputChangeHandle(event):void{
    this.emChange.emit(event);
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
  /*  this._renderer.setProperty(this.radioRef.nativeElement, 'checked', val == this.radioRef.nativeElement.value);*/

  }

  /**
   * implementation ControlValueAccessor
   * @registerOnChange //每次原生表单控件值更新时触发的回调函数
   */
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  /**
   * implementation ControlValueAccessor
   * @registerOnTouched
   * */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }


  /**
   * click handle emit to parentComponent
   * @param event
   */
  public handleClick(event:any){
    this.emClick.emit(event)
  }

  setDisabledState(){

  }


}
