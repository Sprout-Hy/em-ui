import {AfterViewInit, Component, HostBinding, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {NavItemComponent} from './nav-item/nav-item.component';
import {NavitemChangeService} from './navitemChange.service';

@Component({
  selector: 'app-shopnav',
  template: `
    <style></style>
   
    <div class="shopnav-content" style="background-color: #3a8ee6;height: 100%;padding: 20px;">
      <em-nav-menu [data]="navTree"></em-nav-menu>
      
      <!--<div class="row">
        <ng-template #recursiveList let-list>
          
          <li *ngFor=" let item of list">
            {{item.name}}
            <ul *ngIf="item.children?.length">
              <ng-container *ngTemplateOutlet="recursiveList;context:{$implicit: item.children}"></ng-container>
            </ul>
          </li>
          
        </ng-template>

        <ng-container #contianer *ngTemplateOutlet = "recursiveList;context:{$implicit: list}"></ng-container>
       
      
      </div>-->
      
    </div>
  `,
  styleUrls: ['./shopnav.component.scss']
})
export class ShopnavComponent implements OnInit,AfterViewInit {

  public list:Array<{name:string,value:string,children:Array<any>}>=[];
  public navTree:Array<NavitemRecursiveData_> = [];
  @ViewChild('textTemplate') template:TemplateRef<any>;
 /* @HostBinding('class.option') */
  constructor(private vcRef: ViewContainerRef,private itemChangeService:NavitemChangeService) {

   /* this.list = [
      {name:'nav-item-lv1-1',value:'nav-1-1',children:[],},
      {name:'nav-item-lv1-2',value:'nav-1-2',children: [
          {name:'nav-item-lv2-1',value:'nav-2-1',children:[],},
          {name:'nav-item-lv2-2',value:'nav-2-2',children:[],},
        ]
      },
    ];*/

    this.navTree=[
      {
        label:'导航一级_01',
        value:'lv-1',
        routerLink:'',
        anchorUri:'',
        title:'一级导航01',
        children:[],
      },
      {
        label:'导航一级_02',
        value:'lv-1',
        routerLink:'',
        anchorUri:'',
        title:'一级导航02',
        children:[
          {
            label:'导航二级_02_01',
            value:'lv-2-0',
            routerLink:'',
            anchorUri:'',
            title:'二级导航01',
            children:[
              {
                label:'导航三级_01',
                value:'lv-1-0',
                routerLink:'',
                anchorUri:'',
                title:'三级导航01',
                children:[],
                callBack:this.navItemCallback
              },
            ],
          },
          {
            label:'导航二级_02_01',
            value:'lv-2-0',
            routerLink:'',
            anchorUri:'',
            title:'二级导航01',
            children:[],
          },
        ],
      }
    ]

  }

  ngOnInit() {
    //console.log(this.vcRef.parentInjector)
    this.itemChangeService.$navItemChange.subscribe(
      option=>{
        console.log(option);
      }
    )

  }
  ngAfterViewInit(){

  }
  public createView(){
    let o = this.vcRef.createEmbeddedView(this.template);
    console.log(o)
  }

  public allViewDismiss(){
    this.vcRef.clear()
  }

  public navItemCallback(arg:NavItemComponent){
    console.log(arg._navItemData)
  }

}



export interface NavitemRecursiveData_ {
  label:string, //文本
  value:any, //传递的值
  routerLink:string, //router link
  anchorUri:string, //超链接，禁止使用锚点
  title:string, //title
  callBack?:any,
  children:Array<NavitemRecursiveData_>,
}
