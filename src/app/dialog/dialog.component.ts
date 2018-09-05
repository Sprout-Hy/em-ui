/**
 *
 */

import {Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentRef} from '@angular/core/src/linker/component_factory';

@Component({
  selector: 'em-dialog', template: `
    <div class="alert-shell model-bc" [class.hidden]="!show"

    >
      <div class="alert-content">
        <i class="iconfont icon-close-sunken btn-close" (click)="dismiss(true)"></i>
        <ng-template #domRoom >
          <!--方式1 动态加载组件-->
        </ng-template>

        <ng-content>
          <!--方式2 直接显示-->
        </ng-content>
      </div>
    </div>
  `, styleUrls: ['./dialog.component.scss'],

})
export class DialogComponent implements OnInit, OnDestroy {

  public show: boolean = false; //背景色

  public __subComponent: DialogChildComponentData = null; //子组件数据
  private ViewComponent: ComponentRef<any> = null; //子组件
  @ViewChild('domRoom', {read: ViewContainerRef}) ViewContainer: ViewContainerRef; //视图容器

  /**
   * 子组件 数据的 get set 方法
   * @param {DialogChildComponentData} data
   */
  @Input() set data(data: DialogChildComponentData) {



    if (data) {
      this.__subComponent = data;
      this.viewPresent();
    }

  }

  get data(): DialogChildComponentData {
    return this.__subComponent;
  }

  constructor() {

  }


  ngOnInit() {

  }

  /**
   * 销毁
   */
  ngOnDestroy(): void {
    this.subViewDismiss();
  }

  /**
   * 销毁子组件
   */
  public subViewDismiss(){
    /*console.log('__subViewDismiss__');
    console.log(this.ViewComponent);*/
    if (this.ViewComponent){
      this.ViewComponent.destroy();
      this.ViewComponent = null;
    }

  }

  /**
   * 显示子视图
   */
  public viewPresent() {
    if (this.data) {
      /**
       * 若子组件已存在，将之销毁
       */
      this.ViewComponent ? this.ViewComponent.destroy() : null;

      /**
       * 创建子组件
       * @type {ComponentRef<any>}
       */
      this.ViewComponent = this.ViewContainer.createComponent(this.data.component);

      console.log(this.data.component);
      /**
       * 给子组件属性赋值
       */
      for (let key in this.data.inputs) {
        this.ViewComponent.instance[key] = this.data.inputs[key];
      }

      /**
       * 给子组件的 dismiss 方法赋值
       * 使子组件的dismiss 销毁子组件，并关闭弹出框
       * @type {this}
       * @private
       */
      const _that = this;
      this.ViewComponent.instance['dismiss'] = ()=>{
        if (_that.ViewComponent){
          _that.ViewComponent.destroy();
          _that.ViewComponent = null;
        }
        _that.show = false;
      };
      console.log(this.ViewComponent);

    }

    this.show = true;//显示视图

  }


  public dismiss(val?:any) {
      this.subViewDismiss();
      this.show = false;
  }

}

/**
 * 弹出框子组件数据
 */
export interface DialogChildComponentData {
  component: any,
  inputs?: { [key: string]: any },
}

/**
 * 子组件必须实现这个接口
 */
export interface DialogSubComponent {
  /**
   * view dismiss handle
   */
  dismiss():void
}
