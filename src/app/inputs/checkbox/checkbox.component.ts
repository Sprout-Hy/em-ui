import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {SafeStyle} from '@angular/platform-browser';
import {Provider} from '@angular/core/src/di';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR:Provider = {
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
    <div class="el-check-shell">
      <input 
        type="checkbox" 
        hidden
        [checked]="true"
        [class]=" 'em-check' "
        
      >
      <!--图标-->
      <span class="check-delegate">
        <i class="tiny-icon"></i>
      </span>
     
    </div>
  `,
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _value:any='';
  private _disabled: boolean = false;
  private _readonly: boolean = false;

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

  constructor() { }

  ngOnInit() {
  }

}
