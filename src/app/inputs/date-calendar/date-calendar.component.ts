import {Component, Directive, ElementRef, forwardRef, HostListener, OnInit, Provider, ViewChild} from '@angular/core';
import {InputComponent} from '../input/input.component';
import {DomSanitizer} from '@angular/platform-browser';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true
};

const noop = () => {
};


@Component({
  selector: 'em-dateCalendar',
  providers:[CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  template: `
    <div class="date-calendar-wrap" emMouseLeave>
      <em-input #inputSub (click)="handleClick($event)"></em-input>
      <div class="calendar-wrap" *ngIf="isCalendar" #calendarSub>
        
        <div class="calendarInner">
            <div class="calendar-head">
              <span class=" prev-btns">
                <button class="pre-year calendar-btn">pre-y</button>
                <button >pre-m</button>
              </span>
             
              <span class="current-date">
                <span class="c-year"> 
                  <span class="cur-p">2018</span> 年
                </span>
                <span class="c-month">
                  <span class="cur-p">8</span> 月
                </span>
              </span>
              
              <span class="next-btns">
                <button class="pre-year calendar-btn">next-y</button>
                <button >next-m</button>
              </span>
              
            </div>
        </div>
        
      </div>
      
      
      
    </div>
  
  `,
  styleUrls: ['./date-calendar.component.scss']
})
export class DateCalendarComponent extends InputComponent implements OnInit {

   public isCalendar:boolean = false;


    @ViewChild('inputSub') inputRefSub:ElementRef;
    @ViewChild('calendarSub') calendarDivSub:ElementRef;

   constructor( public filtration:DomSanitizer,private ele:ElementRef) {
    super(filtration);


   }

  ngOnInit() {

  }

  public handleClick(event){
    this.emClick.emit(event);
    console.log('DateCalendarComponent');
    console.log(event.currentTarget);
    console.log(event.target);
    this.isCalendar = true;
  }
}


/*
@Directive({
  selector:"[emMouseLeave]",
})

class MouseLeave {
  @HostListener('mousemove',['$event'])
  onMouseLeave(event:MouseEvent){
    console.log(111)
  }

}
*/

