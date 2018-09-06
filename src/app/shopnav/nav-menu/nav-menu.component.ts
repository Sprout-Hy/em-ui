import { Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {NavitemRecursiveData_} from '../shopnav.component';
import {ButtonComponent} from '../../button/button.component';

@Component({
  selector: 'em-nav-menu',
  template: `
    <div class="nav-menu-content">
      <!--定义模板，定义ngTemplateOutletContext  => abstract_NavListData : __NavListData || __NavListData[item].children -->
      <ng-template #navItemTemp let-abstract_NavListData>
        <!--item-->

        <em-nav-item *ngFor=" let item of abstract_NavListData" [data]="item" (OnItemChange)="itemChange()">
          <!--recursive-->
          <div class="shell" *ngIf="item.children">
            <ng-container #recursiveNavLs *ngTemplateOutlet="navItemTemp; context:{$implicit:item?.children}">

            </ng-container>
          </div>
         
        </em-nav-item>

      </ng-template>
      <ng-container #tagContainer *ngTemplateOutlet="navItemTemp; context:{$implicit:__NavListData}">

      </ng-container>
  
    </div>

  `,
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit{
  public __NavListData: Array<NavitemRecursiveData_> = [];

  @Input()
  set data(val: NavitemRecursiveData_[]) {
    if (this.__NavListData != val) {
      this.__NavListData = val;
    }

  }
  @ContentChildren(ButtonComponent) childrenRef!:QueryList<ButtonComponent>; //映射子组件集合
  constructor() {
  }

  ngOnInit() {
  }
  public itemChange(event){
    console.log(event)
  }

}
