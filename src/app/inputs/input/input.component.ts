import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Provider} from '@angular/core/src/di';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true
};

const noop = () => {
};


@Component({
  selector: 'em-input',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  template: `
    <div class="em-input-shell" [style]="secureStyle">
      <input
        #nativeInput
        [type]="nativeType"
        [name]="nativeName"
        [class]="  'el-input '+ className "
        [class.normal]=" !readonly&&!disabled "
        [placeholder]="placeholder"
        [(ngModel)]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [id]="nativeId"
        (click)="handleClick($event)"
        (change)="inputChangeHandle($event)"
        (blur)="inputBlurHandle($event)"
        (focus)="inputFocusHandle($event)"
      />
    </div>

  `, host: {
    '(change)': '_onChangeCallback'
  }, styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  private  _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _value: any = '';
  private _disabled: boolean = false;
  private _readonly: boolean = false;

  public secureStyle: SafeStyle = '';//过滤后的css，不要直接使用setStyle方法，声明周期会付款触发setStyle
  /**
   * -----------------
   * 输入属性 @Input
   * -----------------
   */
  @Input('type') nativeType: 'text' | 'number' | 'password' = 'text';
  @Input() placeholder: string = '';
  @Input('style') nativeStyle: string = '';
  @Input('class') className: string = '';
  @Input('name') nativeName: string = '';
  @Input('id') nativeId: string = '';

  /**  @Input disabled */
  @Input() set disabled(val: any) {
    this._disabled = val;
  }

  get disabled(): any {
    return this._disabled;
  }


  @Input() set value(val: any) {
    /*val!=this._value? this._value = val:null;*/
    if (val != this._value) {
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


  /** 组件内部的input*/
  @ViewChild('nativeInput') inputRef: ElementRef;

  /* private protectedValue:any = '';*/

  /**
   * -------------------------
   * Output
   * -------------------------
   */
  @Output() emClick: EventEmitter<any> = new EventEmitter<any>();  //click handle
  @Output() emChange: EventEmitter<any> = new EventEmitter<any>(); //valueChange handle
  @Output() emBlur: EventEmitter<any> = new EventEmitter<any>(); //blur
  @Output() emFocus: EventEmitter<any> = new EventEmitter<any>();

  /**
   *
   * @param {FormBuilder} fb formBuilder
   * @param {DomSanitizer} filtration 代码合法性过滤，angular官方
   */
  constructor( public filtration: DomSanitizer ) {

  }

  ngOnInit() {

    this.secureStyle = this.setStyle();
  }

  ngAfterViewInit() {

    /* this.formControl.valueChanges.subscribe(
       ()=>{
         if (!this.formControl.value) {
           this.nativeValue = '';
           this.inputRef.nativeElement.value = '';
         }
       }
     )*/


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

  /** 返回过滤后的css*/
  public setStyle() {

    console.log('__setStyle__');
    console.log(new Date().getTime());
    return this.filtration.bypassSecurityTrustStyle(this.nativeStyle);
  }

  /**
   * click handle emit to parentComponent
   * @param event
   */
  public handleClick(event: any) {
    this.emClick.emit(event);
  }

  /**
   * onChange handle.emit to parentComponent
   * @param event
   */
  public inputChangeHandle(event): void {
    this.emChange.emit(event);
  }

  /**
   * onBlur handle.emit to parentComponent
   * @param event
   */
  public inputBlurHandle(event): void {
    this.emBlur.emit(event);
  }

  /**
   * 获取焦点时触发 _onTouchedCallback
   * @param event
   */
  public inputFocusHandle(event): void {
    this._onTouchedCallback();
    this.emFocus.emit(event);
  }
}
