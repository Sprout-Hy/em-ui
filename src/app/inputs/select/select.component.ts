import {Component, forwardRef, Input, OnInit, Provider,} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputComponent} from '../input/input.component';
import {DomSanitizer} from '@angular/platform-browser';

const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR:Provider = {
  provide:NG_VALUE_ACCESSOR,
  useExisting:forwardRef(
    ()=>SelectComponent
  ),
  multi:true
};

/*
const noop = () => {
};
*/

@Component({
  selector: 'em-select',
  providers:[CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
  template: `
    <div class="em-input-shell  em-select-shell" [style]="secureStyle">
      <input
        #nativeInput
        [type]="nativeType"
        [name]="nativeName"
        [class]="  'em-input '+ className "
        [class.normal]=" !readonly&&!disabled "
        [placeholder]="placeholder"
        [(ngModel)]="value"
        [disabled]="disabled"
        [readonly]="true"
        [id]="nativeId"
        (click)="handleClick($event)"
        (change)="inputChangeHandle($event)"
        (blur)="inputBlurHandle($event)"
        (focus)="inputFocusHandle($event)"
      />

      <span class="sel-icon-wrap" (click)="selectIconClickHandle($event)">
        <span class="icon-inner" [class.handle-animate]="isFocus">
          <i class="iconfont icon-suffix_d sele-icon"></i>
        </span>
        
      </span>

      <div class="em-sel-dropdown-wrap em-options-wrap" [class.active-animate]="isFocus">
        <div class="options-inner">
          <ul class="options-ls">
            <li class="option" *ngFor=" let item of optionsData" (click)="optionClickHandle(item)">{{item.label}}</li>

          </ul>
        </div>
      </div>
      
    </div>

    <!-- 遮罩层 -->
    <div class="shade-fixed" *ngIf="isFocus" (click)="selectCloseHandle()"></div>
    
  `,
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends InputComponent implements OnInit {
  /**
   * -----------------
   * 输入属性 @Input
   * -----------------
   */
 /* @Input('type') nativeType: 'text' | 'number' | 'password' = 'text';
  @Input() placeholder: string = '';
  @Input('style') nativeStyle: string = '';
  @Input('class') className: string = '';
  @Input('name') nativeName: string = '';
  @Input('emId') nativeId: string = '';*/

 /* /!**  @Input disabled *!/
  @Input() set disabled(val: any) {
    this._disabled = val;
  }
  get disabled(): any {
    return this._disabled;
  }

  @Input() set value(val: any) {
    /!*val!=this._value? this._value = val:null;*!/
    if (val != this._value) {
      this._value = val;
      this._onChangeCallback(val);//更新组件外formControl
    }
  }
  get value() {
    return this._value;
  }*/




  /** 组件内部的input*/
  //@ViewChild('nativeInput') inputRef: ElementRef;

  /* select component attribute  */
  public isFocus:boolean = false; //是否开启弹窗
  @Input('data') optionsData:Array<SelectOptions_> = []; //
  constructor(public filtration: DomSanitizer) {
    super(filtration)
  }

  ngOnInit() {
  }


  /**
   * 点击时触发 _onTouchedCallback
   * @param event
   */
  public handleClick(event): void {
    this._onTouchedCallback();
    this.emClick.emit(event);
    !this.isFocus?this.isFocus = true:null; //开启 弹出
  }

  /**
   * 关闭 select
   */
  public selectCloseHandle(){
    this.isFocus = false;
  }
  /**
   * 重写 change 函数，将整个item发射出去
   *  {{label: string; value: any }} item
   */
  public optionClickHandle(item:{label:string,value:any}):void{
    this._value = item.label;
    this.inputRef.nativeElement.value = item.label;
    this._onChangeCallback(item.label);
    this.emChange.emit(item);
    this.isFocus = false; //关闭选择器
  }

  /**
   * 下拉图标点击
   */
  public selectIconClickHandle(){
    this.emClick.emit(event);
    this.isFocus = !this.isFocus
  }

}

/**
 * 选择框 元数据接口
 */
export interface SelectOptions_ {
  label:string,
  value:any,
  children?:Array<SelectOptions_>
}
