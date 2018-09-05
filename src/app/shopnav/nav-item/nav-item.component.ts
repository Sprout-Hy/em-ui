import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewContainerRef
} from '@angular/core';
import {NavitemRecursiveData_} from '../shopnav.component';
import {NavitemChangeService} from '../navitemChange.service';

@Component({
  selector: 'em-nav-item',
  template: `
   <div class="nav-item-inner" *ngIf="_navItemData">
     <button
       [title]="_navItemData.title"
       (click)="navItemHeadingClick($event)"
       [class.check]="isActive && _navItemData.children?.length"
       class="nav-header nav-item ">
       {{_navItemData.label}}
       <i *ngIf="_navItemData.children.length" class="iconfont icon-suffix_r header-icon"></i>
     </button>
     <div class="heading-children " *ngIf="_navItemData.children.length" [class.expand]="isActive" [class.collapse]="!isActive" >
       <ng-content  > 
         
       </ng-content>
     </div>
     
   </div>
  `,
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit,AfterContentInit {
  public  _navItemData:NavitemRecursiveData_ = null;
  public isActive:boolean = false;
  @Input('heading') isHeading:boolean = true;
  @Input()
  set data(val:NavitemRecursiveData_){
    if (this._navItemData !=val){
      this._navItemData = val;
    }

  }
  get(){
    return this._navItemData
  }

  @Output() OnItemChange:EventEmitter<any> = new EventEmitter<any>(); //navItem change Emit to parent component.

 /* @ContentChildren(NavItemComponent,{descendants:false}) childrenRef:QueryList<NavItemComponent>; //映射子组件集合 舍弃：递归后,组件又嵌套组件本身，玩不了！*/

  constructor(private itemChangeService:NavitemChangeService) {

  }

  ngOnInit() {

  }

  ngAfterContentInit(){
   /* console.log(this.childrenRef);
    this.childrenRef.changes.subscribe( c => console.log('length is now:' + this.childrenRef.length) );*/
  }

  public navItemHeadingClick(){
    //toggle
    this.isActive = !this.isActive;

    this.OnItemChangeHandle();
    const _that = this;
    this._navItemData.callBack?this._navItemData.callBack(_that):null;
  }

  public OnItemChangeHandle(event?:any){

  /*  if (event){
      this.OnItemChange.emit(event)
    } else{
      let _that = this;

      this.OnItemChange.emit({label:_that._navItemData.label,value:_that._navItemData.value})

    }*/

    this.itemChangeService.navChangeHandle({label:this._navItemData.label,value:this._navItemData.value})

  }

}
