import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'em-button',
  template: `
    <button [class]=" 'em-button ' + ' ' + className " (click)="handleClick($event)"
    [disabled]="disabled"
    [style]=" emStyle?setStyle():'' "
    >
      <span class="btn_inner">
        <!--content-->
      <ng-content></ng-content>
      </span>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit,AfterViewInit {

  /* @Input*/
  @Input() size:string = '';
  @Input() color:string = '';
 /* @Input() emDisabled:boolean = false;*/
  @Input('style') emStyle:string = '';
  @Input('class') className:string = '';

  private _disabled:boolean = false;

  /** set property disabled*/
  @Input('disabled')
  set disabled(val:any){
    this._disabled !=val? this._disabled =val:null;
  }
  get disabled():any{
    return this._disabled;
  }

  @Output() emClick:EventEmitter<any> = new EventEmitter<any>();

  constructor(private filtration:DomSanitizer,private ele:ElementRef) {

  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    /*console.log(this.ele.nativeElement);*/
   /* this.removeNgTag(this.ele.nativeElement);*/
  }

  /**
   * click handle
   * @param event
   */
  public handleClick(event){
    this.emClick.emit(event);
  }

  /**
   * filter style string.
   */
  public setStyle():SafeStyle{

    console.log(11);
    return this.filtration.bypassSecurityTrustStyle(this.emStyle);

  }


  /*/!**
   * remove Angular tags
   * @param {HTMLElement} nativeElement
   *!/
  private   removeNgTag (nativeElement: HTMLElement): void {
    const parentElement = nativeElement.parentElement;
    if (!parentElement || !parentElement.insertBefore) return;
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement)
    }
    parentElement.removeChild(nativeElement)
  }*/

}
