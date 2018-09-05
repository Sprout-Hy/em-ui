import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopnavRoutingModule } from './shopnav-routing.module';
import { ShopnavComponent } from './shopnav.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import {ButtonModule} from '../EMUI/button/button.module';
import {NavitemChangeService} from './navitemChange.service';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    ShopnavRoutingModule,
  ],
  declarations: [
    ShopnavComponent,
    NavMenuComponent,
    NavItemComponent,
  ],
  entryComponents:[
    ShopnavComponent,
    NavMenuComponent,
    NavItemComponent,
  ],
  exports:[

  ],
  providers:[
    NavitemChangeService
  ]
})
export class ShopnavModule { }
