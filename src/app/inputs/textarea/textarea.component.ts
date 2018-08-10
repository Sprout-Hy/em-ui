import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Provider} from '@angular/core/src/di';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

const noop = () => {
};
 const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR:Provider = {
  provide:NG_VALUE_ACCESSOR,
  useExisting:forwardRef(()=>
    TextareaComponent
  ),
  multi:true
};


@Component({
  selector: 'em-textarea',
  providers:[
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
  ],
  template: `
    <div class="em-textarea-shell">
      <textarea 
        [style]="setStyle()"
        [class]=" 'em-textarea ' +className"
        [class.res-both]="resizeBoth"
        [placeholder]="placeholder"
        [ngModel]="value"
        [disabled]="disabled"
        [readonly]="redaonly"
        (focus)="onFocusHandel($event)"
        (click)="onClickHandle($event)"
        (change)="onValueChangeHandle($event)"
        (blur)="onValueChangeHandle($event)"
        #textarea 
        
      ></textarea>
    </div>
  `,
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit,ControlValueAccessor {
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  private _value:any='';
  private _disabled: boolean = false;
  private _readonly: boolean = false;

  /**
   * inputs
   */
  @Input('style') nativeStyle:string ='';
  @Input('class') className:string = '';
  @Input('name') nativeName:string = '';
  @Input() placeholder:string = '';
  @Input('resize') resizeBoth:boolean=false;
  set disabled(val:any){
    this._disabled = val
  }
  get disabled():any{
    return this._disabled
  }


  @Input()
  set value(val:any){

    if (val!=this._value){
      this._value = val;
      this._onChangeCallback(val)
    }
  }
  get value(){
    return this._value;
  }

  @Input()
  set readonly(val:any){
    this._readonly !=val?this._readonly = val:null;
  }

  get  redaonly():any{
    return this._readonly
  }

  @ViewChild('textarea') textareaRef:ElementRef;

  /**
   * -------------------------
   * Output
   * -------------------------
   */
  @Output() emClick:EventEmitter<any> = new EventEmitter<any>();  //click handle
  @Output() emChange:EventEmitter<any> = new EventEmitter<any>(); //valueChange handle
  @Output() emBlur :EventEmitter<any> = new EventEmitter<any>(); //lose focus :blur
  @Output() emFocus :EventEmitter<any> = new EventEmitter<any>();

  constructor(private filtration:DomSanitizer) {

  }

  ngOnInit() {
    let val = this.textareaRef.nativeElement.value;
    console.log('val=> length is '+val.length);
    console.log(this)
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
   * 获取焦点时触发 _onTouchedCallback
   * @param event
   */
  public onFocusHandel(event):void{
    this._onTouchedCallback();
    this.emFocus.emit(event);
    console.log(this.filtration.bypassSecurityTrustStyle(this.nativeStyle))
  }

  public onClickHandle(event):void{
    /*this.emClick.emit(event);
    console.log('111')*/
  }

  public onBlurHandle(event):void{
    this.emBlur.emit(event);
  }

  public onValueChangeHandle(event):void{
    this.emChange.emit(event);
  }

}
