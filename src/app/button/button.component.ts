import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'em-button',
  template: `
    <button [class]=" 'em-button ' + ' ' + className " (click)="handleClick($event)"
    [disabled]="emDisabled"
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
  @Input() emDisabled:boolean = false;
  @Input('style') emStyle:string = '';
  @Input('class') className:string = '';
  @Output() emClick:EventEmitter<any> = new EventEmitter<any>();

  constructor(private filtration:DomSanitizer,private ele:ElementRef) {

  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    console.log(this.ele.nativeElement);
   /* this.removeNgTag(this.ele.nativeElement);*/
  }

  /**
   * click handle
   * @param event
   */
  public handleClick(event){
    this.emClick.emit(event);
    console.log(event)
  }

  public setStyle():SafeStyle{

    /**
     * filter style string.
     */
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
