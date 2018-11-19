import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, ViewChild,ComponentFactoryResolver} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {Provider} from '@angular/core/src/di';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, CheckboxControlValueAccessor} from '@angular/forms';

const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR:Provider = {
  provide:NG_VALUE_ACCESSOR,
  useExisting:forwardRef(()=>
    CheckboxComponent
  ),
  multi:true
};
const noop = () => {
};

@Component({
  selector: 'em-checkbox',
  template: `
    <div class="em-check-shell">
      <label>
        <input
          #inputChecked
          type="checkbox"
          hidden
          [class]=" 'em-check ' + className"
          [style]="secureStyle"
          [attr.name]="nativeName"
          [id]="nativeId"
          [disabled]="disabled"
          [(ngModel)]="checked"
          [checked]="checked"
          (change)="valueChangeHandle($event)"

        >
        <!--图标-->
        <span class="check-delegate">
          <i class="tiny-icon"></i>
        </span>
      </label>


    </div>

  `,
  host:{
    '(change)':'onChange'
  },
  providers:[
    CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR
  ],
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit,ControlValueAccessor
{
  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;
  private _value:any =null;
  private _disabled: boolean = false;

  public secureStyle:SafeStyle = '';//过滤后的css，不要直接使用setStyle方法，声明周期会付款触发setStyle
  /**
   * -----------------
   * 输入属性 @Input
   * -----------------
   */
  @Input('style') nativeStyle:string ='';
  @Input('class') className:string = '';
  @Input('name') nativeName:string = '';
  @Input('id') nativeId:string = '';
/*  @Input() checked:boolean =false;*/

  // disabled
  @Input() set disabled(val:boolean){
    this._disabled = val;
  }

  get disabled():boolean{
    return this._disabled
  }

  // value
  @Input()
  set checked(val:any){
    console.log(val);
    if (this._value != val){
      this._value = this.coerceBooleanProperty(val);
      this.onChange(val);
    }
  }

  get checked(){
    return this._value
  }


  /**
   * -------------------------
   * Output
   * -------------------------
   */
  @Output() emClick:EventEmitter<any> = new EventEmitter<any>();  //click handle
  @Output() emChange:EventEmitter<any> = new EventEmitter<any>(); //valueChange handle


  @ViewChild('inputChecked') checkRef:ElementRef;
  constructor(private filtration: DomSanitizer,private _renderer:Renderer2, private _elementRef:ElementRef) {

  }

  ngOnInit() {
    this.secureStyle = this.setStyle();
  }


  /** 返回过滤后的css*/
  public setStyle(){
    return this.filtration.bypassSecurityTrustStyle(this.nativeStyle)
  }

  /**
   *  /*
   * @param event
   */
  public clickHandle(event:any):void{
    this.emChange.emit(event);
  }

  /**
   * checkbox onchange handle.
   * @param event
   */
  public valueChangeHandle(event:any):void{
    this.emChange.emit(event);
  }

  /**
   * implementation ControlValueAccessor
   * @writeValue //设置原生表单控件的值
   */
  writeValue(val:any):void {
    this._value = val;
  /*  this._renderer.setProperty(this._elementRef.nativeElement, 'checked', val == this._elementRef.nativeElement.value);*/
  }
  /**
   * implementation ControlValueAccessor
   * @registerOnChange //每次原生表单控件值更新时触发的回调函数
   */
  registerOnChange(fn: any){
    this.onChange = fn;

  }
  /**
   * implementation ControlValueAccessor
   * @registerOnTouched
   * */
  registerOnTouched(fn: any){
    this.onTouched = fn
  }

  setDisabledState(){

  }

  coerceBooleanProperty(val:any):boolean {
    return val != null && String(val)!= 'false' && val !=='';
  }


}
