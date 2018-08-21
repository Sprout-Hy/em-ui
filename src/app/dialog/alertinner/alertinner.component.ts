import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DialogSubComponent,} from '../dialog.component';

@Component({
  selector: 'app-alertinner',
  template: `
    <div [class]=" 'container '+ className">
      <p>
        alertinner works!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At excepturi illum ipsa nam nulla pariatur reprehenderit, sequi temporibus! Ad animi eos, est eveniet facilis non nulla tenetur. Expedita, quae repellat?

    
      </p>
      <form [formGroup]="formModule">
        <input type="text" formControlName="text">
        <button (click)="viewDismiss()">关闭按钮</button>
      </form>
    </div>
  
  `,
  styleUrls: ['./alertinner.component.scss']
})
export class AlertinnerComponent implements OnInit,OnDestroy,DialogSubComponent {
  public formModule:FormGroup;
  public className:any = '';
  @Input('valued') testValue:any = 1;
  public dismiss = null;
  constructor(private fb:FormBuilder) {
    this.formModule = this.fb.group({
      text:[],
    })
  }

  ngOnInit() {
    this.setTextValue(1232);
  }
  ngOnDestroy(): void {

  }
  setTextValue(val:any){
    this.formModule.get('text').setValue(val)
  }

  public viewDismiss(){
    this.dismiss()
  }

}
