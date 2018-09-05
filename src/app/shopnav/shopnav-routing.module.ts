import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShopnavComponent} from './shopnav.component';

const routes: Routes = [
  {path:'shopNavLs',component:ShopnavComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopnavRoutingModule { }
