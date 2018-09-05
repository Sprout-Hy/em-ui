import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  Provider,
  SimpleChange
} from '@angular/core';
import {InputComponent} from '../input/input.component';
import {DomSanitizer} from '@angular/platform-browser';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};


@Component({
  selector: 'em-select',
  providers:[
    CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR
  ],
  changeDetection:ChangeDetectionStrategy.OnPush,
  template: `
    
    <div class="em-input-shell em-select-shell" [style]="secureStyle">
      <input
        #nativeInput
        type="text"
        [name]="nativeName"
        [class]="  'em-input '+ className "
        [class.normal]=" !readonly&&!disabled "
        [class.s-focus]="isFocus"
        [placeholder]="placeholder"
        [(ngModel)]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [id]="nativeId"
       
        (change)="inputChangeHandle($event)"
        (blur)="inputBlurHandle($event)"
        (focus)="inputFocusHandle($event)"
      />
      <span class="sel-icon-wrap">
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
export class SelectComponent extends InputComponent implements OnInit,OnChanges,ControlValueAccessor {

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

 // @Output() emChange: EventEmitter<any> = new EventEmitter<any>(); //valueChange handle

  public isFocus:boolean = false;
  @Input('data') optionsData:Array<{label:string,value:any}> = [];

  constructor(public filtration: DomSanitizer, private zone:NgZone, private cdr:ChangeDetectorRef) {
    super(filtration);
  }


  ngOnInit() {


  }

  ngOnChanges(changes:{[propKey:string]:SimpleChange}){
    /* for (let propName in changes) {
       let changedProp = changes[propName];

       if (propName == 'optionsData'&& !changedProp.firstChange) {
       }
     }*/

  }


  /**
   * 获取焦点时触发 _onTouchedCallback
   * @param event
   */
  public inputFocusHandle(event): void {
    this._onTouchedCallback();
    this.emFocus.emit(event);
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
   * @param  {{label: string; value: any }} item
   */
  public optionClickHandle(item:{label:string,value:any}):void{
      this._value = item.label;
      this.inputRef.nativeElement.value = item.label
      this._onChangeCallback(item.label);
      this.emChange.emit(item);
      this.isFocus = false; //关闭选择器
  }

}
