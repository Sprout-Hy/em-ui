import {AfterViewInit, Component, forwardRef, OnInit, Provider, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {SelectComponent, SelectOptions_} from '../select/select.component';
import {DomSanitizer} from '@angular/platform-browser';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {EmbeddedViewRef} from '@angular/core/src/linker/view_ref';



const CUSTOM_CASCADE_CONTROL_VALUE_ACCESS:Provider = {
  provide:NG_VALUE_ACCESSOR,
  useExisting:forwardRef(
    ()=>CascadeComponent
  ),
  multi:true
};

const noop = () => {
};



@Component({
  selector: 'em-cascade',
  providers:[CUSTOM_CASCADE_CONTROL_VALUE_ACCESS],
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

      <div class="em-sel-dropdown-wrap em-options-wrap"  [class.active-animate]="isFocus">
        
        <div class="options-inner"  #tagContainer>
          <ul class="options-ls">
            <li class="option" *ngFor=" let item of optionsData" (click)="optionClickHandle(item)">
              {{item.label}}
              <i class="item-mark iconfont icon-suffix_r"></i>
            </li>

          </ul>
          
        </div>

        <ng-template let-OptionList #cascadeTemplate>
          <div class="options-inner" >
            <ul class="options-ls">
              <li class="option">
                fuck
              </li>
              <li class="option" *ngFor=" let item of OptionList" (click)="optionClickHandle(item)">
                {{item.label}}
                <i class="item-mark iconfont icon-suffix_r"></i>
              </li>
            </ul>

          </div>
        </ng-template>

        <!--context 声明为数组-->
        <ng-template let-OptionList #optionsInnerTemplate>
          <div class="options-inner" *ngFor="let Options of OptionList">
            <ul class="options-ls">
              <li class="option" *ngFor=" let item of Options" (click)="optionClickHandle(item)">
                {{item.label}}
                <i class="item-mark iconfont icon-suffix_r"></i>
              </li>
            </ul>

          </div>
        </ng-template>
      
        
       <!-- <ng-container  #tagContainer></ng-container>-->
       <!-- <ng-container  *ngTemplateOutlet="optionsInnerTemplate; context:{$implicit:ChildCategoryOptionArr}"></ng-container>-->
      </div>
      <!--<button (click)="clearView()">111</button>-->
    </div>

    <!-- 遮罩层 -->
    <div class="shade-fixed" *ngIf="isFocus" (click)="selectCloseHandle()"></div>
  `,
  styleUrls: ['./cascade.component.scss']
})

/**
 * Extends SelectComponent.
 */
export class CascadeComponent extends SelectComponent implements OnInit, AfterViewInit {

  @ViewChild('optionsInnerTemplate') opsTemp:TemplateRef<any>;  //无用
  @ViewChild('cascadeTemplate',{read:TemplateRef}) _Temp:TemplateRef<any>;  //
  @ViewChild('tagContainer',{read:ViewContainerRef}) dynamicContainer:ViewContainerRef;

  public ChildCategoryOptionArr:Array< SelectOptions_ [] > =[]; //子分类数据列表 [ [], [] ]
  public OptionArr:Array< SelectOptions_  > =[];
  constructor(public filtration: DomSanitizer,) {

    super(filtration);// super()

  }

  ngOnInit() {

    this.OptionArr = [{label:'选项01',value:'222',children:[]}];

    let oo = this.dynamicContainer.createEmbeddedView(this._Temp,{$implicit:this.OptionArr},2);
    console.log( oo )
  /* this.ChildCategoryOptionArr.push(
     [ {label:'选项2',value:'222',children:[
         {label:'选项3',value:'222',children:[{label:'选项2',value:'222',children:[]},]}
       ]
      }
     ],
   )*/

  }

  ngAfterViewInit(){
    console.log(this.dynamicContainer);
  }


  clearView(){
    this.dynamicContainer.clear()
  }
}
