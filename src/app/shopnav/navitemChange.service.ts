import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class NavitemChangeService {

   public  option:NavItemOps;

   constructor(){

   }

   @Output() $navItemChange:EventEmitter<NavItemOps> = new EventEmitter();

   public navChangeHandle(ops:NavItemOps){
     this.option = ops;
     this.$navItemChange.emit(this.option)
   }

}

export interface NavItemOps {
  label:string,
  value:string
}
