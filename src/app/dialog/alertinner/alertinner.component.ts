import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-alertinner',
  template: `
    <p>
      alertinner works!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. At excepturi illum ipsa nam nulla pariatur reprehenderit, sequi temporibus! Ad animi eos, est eveniet facilis non nulla tenetur. Expedita, quae repellat?

    
    </p>
    <form [formGroup]="formModule">
      <input type="text" formControlName="text">
    </form>
  `,
  styleUrls: ['./alertinner.component.scss']
})
export class AlertinnerComponent implements OnInit {
  public formModule:FormGroup;

  constructor(private fb:FormBuilder) {
    this.formModule = this.fb.group({
      text:[],
    })
  }

  ngOnInit() {

  }

  setTextValue(val:any){
    this.formModule.get('text').setValue(val)
  }

}
