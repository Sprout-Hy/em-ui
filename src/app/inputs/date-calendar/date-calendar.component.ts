import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Provider, Renderer2, ViewChild} from '@angular/core';
import {InputComponent} from '../input/input.component';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateCalendarComponent), multi: true
};

const noop = () => {
};


@Component({
  selector: 'em-dateCalendar', providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR], template: `
    <div class="date-calendar-wrap" #rootCalendar>
      <div class="em-input-shell" [style]="secureStyle">
        <input
          #nativeInput
          [type]="nativeType"
          [name]="nativeName"
          [class]="  'em-input '+ className "
          [class.normal]=" !readonly&&!disabled "
          [placeholder]="placeholder"
          [(ngModel)]="value"
          [disabled]="disabled"
          [readonly]="false"
          [id]="nativeId"
          (click)="calendarInputClick($event)"
          (change)="inputChangeHandle($event)"
          (blur)="inputBlurHandle($event)"
          (focus)="inputFocusHandle($event)"
        />
      </div>
      <div class="calendar-wrap" *ngIf="isCalendar" #calendarSub>
        <i class="iconfont icon-close-sunken calendar-close" (click)="isCalendar = false" title="关闭"></i>
        <div class="calendarInner">

          <div class="date-wap" *ngIf="!isYearChoice">

            <div class="calendar-head" style="font-size: 14px">
              <span class=" prev-btns">
                <button class="pre-year calendar-btn" (click)="toggleToPrevYear($event)">
                  <i class="icon-btn iconfont icon-prev-double" title="上一年度"></i>
                </button>
                <button title="上一月" (click)="toggleToPrevMonth($event)">
                  <i class="icon-btn iconfont icon-perv-single"></i>
                </button>
              </span>

              <span class="current-date" style="font-size: 16px">
                <span class="c-year" (click)="choiceYear()"> 
                  <span class="cur-p">{{reveal_time.year}}</span> 年
                </span>
                <span class="c-month">
                  <span class="cur-p">{{reveal_time.month}}</span> 月
                </span>
              </span>

              <span class="next-btns">
                <button class="icon-btn next-month calendar-btn" title="下一月" (click)="toggleToNextMonth($event) ">
                  <i class=" iconfont icon-next-single"></i>
                </button>
                <button class="icon-btn next-year" title="下一年度" (click)="toggleToNextYear($event)">
                  <i class="icon-btn iconfont icon-next-double"></i>
                </button>
              </span>

            </div>
            <div class="calendar-body">
              <table class="tab-calendar" border="0" cellspacing="">
                <tr>
                  <th><span class="ck-h-itm">日</span></th>
                  <th><span class="ck-h-itm">一</span></th>
                  <th><span class="ck-h-itm">二</span></th>
                  <th><span class="ck-h-itm">三</span></th>
                  <th><span class="ck-h-itm">四</span></th>
                  <th><span class="ck-h-itm">五</span></th>
                  <th><span class="ck-h-itm">六</span></th>
                </tr>

                <tr *ngFor="let col of calendar_list">
                  <td *ngFor="let data of col">
                    <div class="ck-td">
                    <span class="ck-td-item"
                          (click)="calendarItemCheck(data)"
                          [class.current-m]="data.isCurrentM"
                          [class.ck-day]="data.day == current_select_time.day && data.month == current_select_time.month && data.year == current_select_time.year ">{{data.day}}</span>
                    </div>
                  </td>
                </tr>

              </table>
            </div>
            <!--range-->
          </div>

        </div>

      </div>
    </div>

  `, styleUrls: ['./date-calendar.component.scss']
})
export class DateCalendarComponent  implements OnInit,ControlValueAccessor {
  private  _onTouchedCallback: () => void = noop; //onTouche 回调
  private _onChangeCallback: (_: any) => void = noop; //value on change 回调
  private _value: any = '';
  private _disabled: boolean = false;
  private _readonly: boolean = false;

  public isYearChoice:boolean = false; //年份选择


  public secureStyle: SafeStyle = '';//过滤后的css，不要直接使用setStyle方法，
  public isCalendar: boolean = false; //是否显示日历（是否弹出）
  public current_select_time: DateTime_; //当前选中的日历
  public reveal_time: DateTime_; //当前显示的
  public calendar_list: Array<[CalendarDay_ []]>; //日历列表

  /**
   * -----------------
   * 输入属性 @Input
   * -----------------
   */
  @Input('type') nativeType: 'text' | 'number' | 'password' = 'text';
  @Input() placeholder: string = '';
  @Input('style') nativeStyle: string = '';
  @Input('class') className: string = '';
  @Input('name') nativeName: string = '';
  @Input('id') nativeId: string = '';

  /**  @Input disabled */
  @Input() set disabled(val: any) {
    this._disabled = val;
  }
  get disabled(): any {
    return this._disabled;
  }


  @Input() set value(val: any) {
    /*val!=this._value? this._value = val:null;*/
    if (val != this._value) {
      this._value = val;
      this._onChangeCallback(val);//更新组件外formControl
    }
  }

  get value() {
    return this._value;
  }

  @Input() set readonly(val: any) {
    this._readonly != val ? this._readonly = val : null;

  }

  get readonly(): any {
    return this._readonly;
  }

  /**
   * -------------------------
   * Output
   * -------------------------
   */
  @Output() emClick: EventEmitter<any> = new EventEmitter<any>();  //click handle
  @Output() emChange: EventEmitter<any> = new EventEmitter<any>(); //valueChange handle
  @Output() emBlur: EventEmitter<any> = new EventEmitter<any>(); //blur
  @Output() emFocus: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('nativeInput') inputRef: ElementRef;
  @ViewChild('calendarSub') calendarDivSub: ElementRef;
  @ViewChild('rootCalendar') rootCalendar:ElementRef;
 /* private element:ElementRef;*/
  constructor(public filtration: DomSanitizer, private rende: Renderer2,private ele:ElementRef) {
    /*super(filtration);*/

    this.secureStyle = this.setStyle();
  }

  ngOnInit() {
    let now_time = new Date();
    this.current_select_time = {
      year: now_time.getFullYear(), month: now_time.getMonth() + 1, day: now_time.getDate(), weekday: now_time.getDay(),
    };

    this.reveal_time = {
      year: now_time.getFullYear(), month: now_time.getMonth() + 1, day: now_time.getDate(), weekday: now_time.getDay(),
    };

    this.calendarListInit();  //初始化日历

    this.ele.nativeElement.onmouseleave= (event)=>{ //移出时关闭日历
      this.isCalendar?this.isCalendar = false:null;
    }



  }

  public calendarClose(event){

    let target:any = event;
    if (target == this.rootCalendar.nativeElement) { //是否是根元素 #rootCalendar
      return
    }

    /* if (!has(childNodes,target)){
       this.isCalendar = false;
     }*/
    let parent = target.parentNode;
    while (parent){
      if (parent.className&&parent.className.search('date-calendar-wrap')>-1){

        return
      }
      parent = parent.parentNode;
      console.log(parent)
    }
    this.isCalendar = false;
  }




  /**
   * 初始化日历
   */
  private calendarListInit() {
    let __year = this.reveal_time.year; //年份
    let __month = this.reveal_time.month; //月份

    let __week = new Date(__year + '/' + __month + '/' + '1').getDay(); //一号周几
    let __monthLength = this.getMonthLength(this.reveal_time.year, __month); //本月有多少天
    let __prevMonthLength = this.getMonthLength(__month > 2 ? __year : __year - 1, __month > 1 ? __month - 1 : 12); //上个月多少天
    let arr: Array<CalendarDay_> = [];
    // 插入主日历
    for (let i = 0; i < __monthLength; i++) {
      arr.push({
        day: i + 1, month: __month, year: __year, isCurrentM: true
      });
    }

    //插入上月日历结余
    for (let j = 0; j < __week; j++) {
      arr.unshift({
        day: __prevMonthLength - j, month: __month > 1 ? __month - 1 : 12, year: __month > 1 ? __year : __year - 1, isCurrentM: false,
      });
    }

    //下入下个月份
    let len = arr.length;
    for (let k = 0; k < 42 - len; k++) {
      arr.push({
        day: k + 1, month: __month < 12 ? __month + 1 : 1, year: __month < 12 ? __year : __year + 1, isCurrentM: false
      });

    }

    // 日历序列化，每七个一分组
    let outputArr = [];
    for (let l = 0; l < 6; l++) {
      outputArr.push(arr.slice(l * 7, l * 7 + 7));
    }
    this.calendar_list = outputArr; //
    /*console.log(this.calendar_list)*/
  }

  /**
   * 获取指定月份有多少天
   * @param {number} year
   * @param {number} month
   * @returns {number}
   */
  private getMonthLength(year: number, month: number,): number {
    if (0 > month || month > 13 || year < 0 || isNaN(month) || isNaN(year)) {
      console.log('别瞎胡传值 __getMonthLength__');
      return;
    }
    let dayThirtyOne = {'1': true, '3': true, '5': true, '7': true, '8': true, '10': true, '12': true}; //31天的月份
    let dayThirty = {'4': true, '6': true, '9': true, '11': true}; // 30天的月份
    if (String(month) in dayThirtyOne) { //31
      return 31;
    } else if (String(month) in dayThirty) { //30
      return 30;
    } else if (month == 2) { //闰年 2月处理
      return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0) ? 29 : 28;
    } else {
      throw new Error('get month length error '); //return error
    }
  }

  private setComponentValue(value:any):void{
    this.writeValue(value); //更新值
    this._onChangeCallback(value); //onchange回调
    this.emChange.emit(value) //触发外部组件的change时间
  }


  /**
   * 输入框点击，弹出日历
   * @param event
   */
  public calendarInputClick(event) {
    this.isYearChoice = false;
    this.isCalendar = true; //打开日历



    let _date = new Date(); //获取当前时间
    if (!this.inputRef.nativeElement.value) {
      let value = _date.toLocaleDateString();

      this.setComponentValue(value)  //更新组件 值

    }else{ //空值时初始化日历
      try {
        let date = new Date( this.inputRef.nativeElement.value );
        let date_time:DateTime_ ={
          year:date.getFullYear(),
          month:date.getMonth()+1,
          day:date.getDate(),
          weekday:date.getDay(),
        };

        this.reveal_time = date_time;

      }catch (e) {
        throw new Error(e)
      }


    }

    this.handleClick(event); //


  }

  //日期选择事件
  public calendarItemCheck(data: CalendarDay_) {

    let $date: DateTime_ = {
      year: data.year,
      month: data.month,
      day: data.day,
      weekday: new Date(data.year + '/' + data.month + '/' + data.day).getDay()
    };
    console.log($date);
    this.current_select_time = $date;

    let __value=this.current_select_time.year+'/'+this.current_select_time.month+'/'+this.current_select_time.day ; //更新值

  /*  this.writeValue(__value); //更新值
    this._onChangeCallback(__value); //onchange回调
    this.emChange.emit(__value); //触发外部组件的change时间*/
    this.setComponentValue(__value);  //更新组件 值

    this.isCalendar = false ; //关闭弹出层

  }

  //切换到下一月
  public toggleToNextMonth(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (this.reveal_time.month < 12) {
      this.reveal_time.month += 1;
    } else if (this.reveal_time.month == 12) {
      this.reveal_time.year += 1;
      this.reveal_time.month = 1;
    }
    this.calendarListInit(); //更新日历视图
  }

  //切换到下一年度
  public toggleToNextYear(event): void {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    this.reveal_time.year += 1;
    this.reveal_time.month = 1;
    this.calendarListInit(); //更新日历视图

  }

  //切换到上一月
  public toggleToPrevMonth(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (this.reveal_time.month > 1) {
      this.reveal_time.month -= 1;
    } else if (this.reveal_time.month == 1) {
      this.reveal_time.year -= 1;
      this.reveal_time.month = 12;
    }
    this.calendarListInit(); //更新日历视图
  }

  //切换到上一年度
  public toggleToPrevYear(event): void {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    this.reveal_time.year += 1;
    this.reveal_time.month = 1;
    this.calendarListInit(); //更新日历视图

  }

  /** 返回过滤后的css*/
  public setStyle() {

    return this.filtration.bypassSecurityTrustStyle(this.nativeStyle);

  }

  /**
   * click handle emit to parentComponent
   * @param event
   */
  public handleClick(event: any) {
    this.emClick.emit(event);
  }

  /**
   * onChange handle.emit to parentComponent
   * @param event
   */
  public inputChangeHandle(event): void {
    console.log(event.target.value);
    this.emChange.emit(event);
  }

  /**
   * onBlur handle.emit to parentComponent
   * @param event
   */
  public inputBlurHandle(event): void {
    this.emBlur.emit(event);
  }

  /**
   * 获取焦点时触发 _onTouchedCallback
   * @param event
   */
  public inputFocusHandle(event): void {
    this._onTouchedCallback();
    this.emFocus.emit(event);
  }


  /**
   * implementation ControlValueAccessor
   * @writeValue //设置原生表单控件的值
   */
  writeValue(val: any): void {
    this._value = val;
  }

  /**
   * implementation ControlValueAccessor
   * @registerOnChange //每次原生表单控件值更新时触发的回调函数
   */
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  /**
   * implementation ControlValueAccessor
   * @registerOnTouched
   * */
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  /**
   * 选择年份 && 月
   */
  public choiceYear():void{
    this.isYearChoice = true;
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

interface DateTime_ {
  year: number,
  month: number,
  day: number,
  weekday: number,
}

interface CalendarDay_ {
  year: number,
  month: number,
  day: number,
  isCurrentM: boolean,
}
