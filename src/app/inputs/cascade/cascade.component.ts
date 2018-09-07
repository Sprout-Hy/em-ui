/**
 * create by Eric·hu .
 * 2018-9
 * 当我写下这个组件的时候，只有我和上帝知道这玩意是干啥的
 */

import {
  AfterViewInit, Component, forwardRef, Input, OnChanges, OnInit, Provider, Renderer2, TemplateRef, ViewChild, ViewContainerRef
} from '@angular/core';
import {SelectComponent, SelectOptions_} from '../select/select.component';
import {DomSanitizer} from '@angular/platform-browser';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {EmbeddedViewRef} from '@angular/core/src/linker/view_ref';


const CUSTOM_CASCADE_CONTROL_VALUE_ACCESS: Provider = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CascadeComponent), multi: true
};

const noop = () => {
};


@Component({
  selector: 'em-cascade', providers: [CUSTOM_CASCADE_CONTROL_VALUE_ACCESS], template: `
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
        <!-- 【主选项框】 -->
        <div class="options-inner" #tagContainer>
          <ul class="options-ls">
            <li class="option"  *ngFor=" let item of OptionArr;let idx =index; " [class.check]="checkOptionsIndexList[0]== idx" (click)="firstDropDownCheck(idx)">
              {{item.label}}
              <i class="item-mark iconfont icon-suffix_r" *ngIf="item.children?.length"></i>
            </li>

          </ul>

        </div>
        <!--模板、用于动态创建 【子选项框】 view -->
        <ng-template let-option #cascadeTemplate>
          <div class="options-inner">
            <ul class="options-ls">
              <li class="option" *ngFor=" let item of option.data;let idx = index" [class.check]="checkOptionsIndexList[option.viewIndex+1]== idx" (click)="cascadeOptionClick(item, option.viewIndex, idx)">
                {{item.label}}
                <i class="item-mark iconfont icon-suffix_r" *ngIf="item.children?.length"></i>
              </li>
            </ul>
          </div>
        </ng-template>

  
      </div>
    </div>

    <!-- 遮罩层 -->
    <div class="shade-fixed" *ngIf="isFocus" (click)="selectCloseHandle()"></div>
  `, styleUrls: ['./cascade.component.scss']
})

/**
 * Extends SelectComponent.
 *  @link
  *
  *
  */ export class CascadeComponent extends SelectComponent implements OnInit, AfterViewInit {


  @ViewChild('optionsInnerTemplate') opsTemp: TemplateRef<any>;  //无用
  @ViewChild('cascadeTemplate', {read: TemplateRef}) _Temp: TemplateRef<any>;  // 用于创建新选项框的 Template
  @ViewChild('tagContainer', {read: ViewContainerRef}) dynamicContainer: ViewContainerRef;

  /**
   * Input DataSource:{@link Array<SelectOptions_>}
   * @param {Array<SelectOptions_>} val
   */
  @Input() set data(val: Array<SelectOptions_>) {
    (this.OptionArr == val) || (this.OptionArr = val);
    this.OptionArr != val ? this.OptionArr = val : null;
  }

  public EmbeddedViewList: Array<EmbeddedViewRef<any>> = []; // 子选项框视图,用与记录和对照 。
  public OptionArr: Array<SelectOptions_> = []; //由外部组建输入的 元数据

  /**
   * 用户存储 当前选中的选项下标。
   * 非连续的
   * checkOptionsIndexList[0] => 主选择框选中选项的index.  checkOptionsIndexList中的其他下标为对应的 viewIndex+1.
   * @type {number[]}
   */
  public checkOptionsIndexList:Array<number> =[];


  /**
   * 当前 新增的选择框 索引
   * @type {number}
   */
  private drop_down_wrap_index: number = 0;


  constructor(public filtration: DomSanitizer, private render: Renderer2) {

    super(filtration);// super()

  }

  ngOnInit() {

    this.OptionArr = [

      {
        label: '选项01', value: '111', children: [{
          label: '选项02-1',
          value: '2-1',
          children: [
            {label: '选项3-1', value: '2-1', children: []},
            {label: '选项3-2', value: '2-2', children: []},]
        },
        {
          label: '选项02-2',
          value: '2-2',
          children: []
        },
        ]
      },
      {
        label: '选项01', value: '111', children: [{
          label: '选项02-1',
          value: '2-1',
          children: [
            {label: '选项3-1', value: '2-1', children: []},
            {label: '选项3-2', value: '2-2', children: []},]
        },
          {
            label: '选项02-2',
            value: '2-2',
            children: []
          },
        ]
      },
    ];

    /* let _context = {viewIndex:this.drop_down_wrap_index, data: this.OptionArr};

     let oo = this.dynamicContainer.createEmbeddedView(this._Temp,{$implicit:_context},2);
     console.log( oo );

     this.ChildCategoryOptionArr.push(
      [ {label:'选项2',value:'222',children:[
          {label:'选项3',value:'222',children:[{label:'选项2',value:'222',children:[]},]}
        ]
       }
      ],
    )

    */

  }

  ngAfterViewInit() {
    console.log(this.dynamicContainer);
  }



  /**
   * 主选项框，点击选择
   * @Type Event click.
   * @param {number} index
   */
  public firstDropDownCheck(index: number): void {

    this.checkOptionsIndexList=[index]; //初始化

    let __data = this.OptionArr[index]; //取出选中数据


    if (__data.children.length) {
      //有子选项列表,创建子视图。
      this.createEmbeddedViewWithCheckOption(__data.children, -1);

    } else {
      //若没有子选项列表：!item.length ,执行提交操作。
      this.cascadeChecked({label: __data.label, value: __data.value});
    }

    return;

  }

  /**
   * 子选项框 选择事件
   * @param {SelectOptions_} optionData
   * @param {number} viewIndex
   * @param {number} itemIndex
   */
  public cascadeOptionClick(optionData: SelectOptions_, viewIndex: number, itemIndex:number): void {


    /**
     * 删除 checkOptionsIndexList EmbeddedViewIndex+1 位置以及以后的所有index
     */

    this.checkOptionsIndexList.splice(viewIndex+1 );

    this.checkOptionsIndexList[ viewIndex+1 ] = itemIndex;

    if (optionData.children.length) {

      this.createEmbeddedViewWithCheckOption(optionData.children, this.drop_down_wrap_index);

    } else { //提交

      let out_put_value: { label: string, value: any } = {label: optionData.label, value: optionData.value};

      this.cascadeChecked(out_put_value);
    }

  }


  /**
   * 根据选中选项的子选项数据，创建视图 或 销毁原视图并创建新视图
   * @param {Array<SelectOptions_>} opsArr
   * @param {number} EmbeddedViewIndex
   */
  private createEmbeddedViewWithCheckOption(opsArr: Array<SelectOptions_>, EmbeddedViewIndex: number, ) {
    if (EmbeddedViewIndex != -1 ){

    }



    if (EmbeddedViewIndex >= 0 && this.dynamicContainer.length > EmbeddedViewIndex) {


      /**
       * 删除多余视图
       */

      const view_count: number = this.dynamicContainer.length;

      for (let i = view_count; i >= EmbeddedViewIndex; i--) {
        this.dynamicContainer.remove(i);
      }

      /**
       * {@link EmbeddedViewList} delete from EmbeddedViewList, count : all .
       */
      this.EmbeddedViewList.splice(EmbeddedViewIndex); //

      this.drop_down_wrap_index = EmbeddedViewIndex; //更新 drop_down_wrap_index

    } else if ( EmbeddedViewIndex ==-1 && this.dynamicContainer.length > 0 ) {
      /**
       * { mbeddedViewIndex == -1; @link dynamicContainer.length>0 }.
       * clear { EmbeddedViewIndex}.
       * init drop_down_wrap_index.
       * create new  EmbeddedView insert to ViewContainer.
       */
      this.dynamicContainer.clear();
      this.drop_down_wrap_index = 0;


    }

    /*======= CREATE EmbeddedView ======*/
    let _context = { viewIndex: this.drop_down_wrap_index, data: opsArr };
    /**
     * create EmbeddedView。
     * Error {@link ViewContainerRef.createEmbeddedView} 在使用 argument :index 时无法再指定位置创建新视图;
     * @argument {EmbeddedViewRef<{$implicit: {viewIndex: number; data: Array<SelectOptions_>}}>}
     * @private
     */
    let _EmbeddedView = this.dynamicContainer.createEmbeddedView(this._Temp, {$implicit: _context}, this.drop_down_wrap_index++);

    /**
     * update EmbeddedViewList;
     */
    this.EmbeddedViewList.push(_EmbeddedView); //

    return;

  }


  /**
   * 最终数据选择，
   * @param {{label: string; value: any}} item
   */
  public cascadeChecked(item: { label: string, value: any }) {
    this._value = item.label;
    this.inputRef.nativeElement.value = item.label;
    this._onChangeCallback(item.label);
    this.emChange.emit(item);
    this.isFocus = false; //关闭选择器
    //console.log(this.checkOptionsIndexList)
    this.clearView()
  }

  /**
   * 关闭并清除视图，清除动态数据
   */
  clearView() {
    this.checkOptionsIndexList = [];
    this.drop_down_wrap_index =0; //init
    this.dynamicContainer.clear();
  }

  /**
   * 关闭 select
   */
  public selectCloseHandle(){
    this.isFocus = false;
    this.clearView();
  }

}
