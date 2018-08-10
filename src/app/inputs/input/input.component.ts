import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Provider} from '@angular/core/src/di';
import {DomSanitizer} from '@angular/platform-browser';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR:Provider = {
  provide:NG_VALUE_ACCESSOR,
  useExisting:forwardRef(()=>
    InputComponent
  ),
  multi:true
};

const noop = () => {
};


@Component({
  selector: 'em-input',
  providers:[
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
  ],
  template:
  `
    <div class="em-input-shell" [style]="setStyle()">
      <input
        #nativeInput
        [type]="nativeType"
        [class]="  'el-input '+ className "
        [class.normal]=" !redaonly&&!disabled "
        [placeholder]="placeholder"
        [ngModel]="value" 
        [disabled]="disabled"
        [readonly]="redaonly"
        (click)="handleClick($event)"
        (change)="inputChangeHandle($event)"
        (blur)="inputBlurHandle($event)"
      />
    </div>

  `,
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, ControlValueAccessor,AfterViewInit{
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  private _value:any='';
  private _disabled: boolean = false;
  private _readonly: boolean = false;

  /**
   * -----------------
   * 输入属性 @Input
   * -----------------
   */
  @Input('type') nativeType:'text'|'number'|'password' = 'text';
  @Input() placeholder:string = '';
  @Input('value') nativeValue:any;
  @Input('style') nativeStyle:string ='';
  @Input('class') className:string = '';
  // @Input('formControlName') formControl:FormControl = new FormControl();

  /**  @Input disabled */
  @Input()
  set disabled(val:any){
    this._disabled = val
  }
  get disabled():any{
    return this._disabled
  }


  @Input()
  set value(val:any){
    val!=this._value? this._value = val:null;
  }
  get value(){
    return this._value;
  }

  @Input()
  set readonly(val:any){
    this._readonly !=val?this._readonly = val:null;
  }

  get redaonly():any{
    return this._readonly
  }


  /** 组件内部的input*/
  @ViewChild('nativeInput') inputRef:ElementRef;

  private protectedValue:any = '';

  /**
   * -------------------------
   * Output
   * -------------------------
   */
  @Output() emClick:EventEmitter<any> = new EventEmitter<any>();  //click handle
  @Output() emChange:EventEmitter<any> = new EventEmitter<any>(); //valueChange handle
  @Output() emBlur :EventEmitter<any> = new EventEmitter<any>(); //lose focus :blur

  /**
   *
   * @param {FormBuilder} fb formBuilder
   * @param {DomSanitizer} filtration 代码合法性过滤，angular官方
   */
  constructor(private fb:FormBuilder,private filtration:DomSanitizer) {

  }
  ngOnInit() {

  }

  ngAfterViewInit(){

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
  writeValue(val:any):void {
    this._value = val;
  }
  /**
   * implementation ControlValueAccessor
   * @registerOnChange //每次原生表单控件值更新时触发的回调函数
   */
  registerOnChange(fn: any){
    this._onChangeCallback = fn;
  }
  /**
   * implementation ControlValueAccessor
   * @registerOnTouched
   * */
  registerOnTouched(fn: any){
    this._onTouchedCallback = fn
  }

  /** 返回过滤后的css*/
  public setStyle(){

    return this.filtration.bypassSecurityTrustStyle(this.nativeStyle)
  }

  /**
   * click handle emit to parentComponent
   * @param event
   */
  public handleClick(event:any){
    this.emClick.emit(event)
  }

  /**
   * onChange handle.emit to parentComponent
   * @param event
   */
  public inputChangeHandle(event):void{
    /*  console.log(event.target.value);
      let tagValue = event.target.value;
      this.protectedValue = tagValue;*/
    this.emChange.emit(event)

  }


  public inputBlurHandle(event):void{
    this.emBlur.emit(event)
  }

}
