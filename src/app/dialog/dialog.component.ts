import {Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'em-dialog',
  template: `
    <div class="alert-shell model-bc">
      <div class="alert-content">
       
      
        <ng-template #domRoom>

        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./dialog.component.scss'],

})
export class DialogComponent implements OnInit,OnDestroy {
  private childComponent: any;
  @ViewChild('domRoom',{ read: ViewContainerRef }) ViewContainer:ViewContainerRef; //视图容器

  @Input() component:any;

  public formModule:FormGroup;

  constructor( private cfr : ComponentFactoryResolver,) {

  }


  ngOnInit() {
    this.ViewContainer.createComponent(this.component);

  }

  viewPresent(){

  }

  ngOnDestroy():void{
    console.log()
  }


}
