import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {animate, animation, AnimationBuilder, style, transition} from '@angular/animations';

@Directive({
  selector: '[touchDelete]'
})

 class TouchDeleteDirective implements OnInit {
  @Input()
  elementMaxPosition: number;
  private touchStartX: number; // 记录touch事件的起始点
  private touchLastX: number; // 记录上一次screenX 的位置，用于计算两次touch事件的位移间隔
  //private touchFinishX:number;
  private maxOffsetLength = 136;

  constructor(public el: ElementRef, public renderer: Renderer2, private _builder: AnimationBuilder) {

  }

  ngOnInit() {

  }

  /*
   * touchstart
  * */
  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    event.preventDefault();
    event.stopPropagation();
    let coordinate = event.changedTouches[0];
    this.touchStartX = coordinate.screenX;
    this.touchLastX = coordinate.screenX;
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'none');
  }

  /*
   * touchend
  * */
  @HostListener('touchend', ['$event']) onTouchEnd(event: TouchEvent) {
    event.preventDefault();
    event.stopPropagation();
    let targetEl = this.el.nativeElement;
    let TranslateXnow = Number(targetEl.style.webkitTransform.search(/translateX/) !== -1 ? /^translateX\((\-?\d+)\)?/ig.exec(targetEl.style.webkitTransform)[1] : 0);
    this.renderer.setStyle(targetEl, 'transition', `transform 100ms ease-in-out`);
    if (TranslateXnow < 0) {
      Math.abs(TranslateXnow) >= this.maxOffsetLength / 2 ? this.autoScroll(TranslateXnow, -this.maxOffsetLength, targetEl)
        : this.autoScroll(TranslateXnow, 0, targetEl);

    }
  }

  /*
  * touchmove
  * */
  @HostListener('touchmove', ['$event']) onTouchMove(event: TouchEvent) {
    event.preventDefault();
    event.stopPropagation();

    let coordinate = event.changedTouches[0];
    let targetEl = this.el.nativeElement;
    let touchOffsetX = this.touchLastX - coordinate.screenX;
    /*手指偏移量*/
    /*dom元素位移量（translateX）*/
    let TranslateXnow = Number(targetEl.style.webkitTransform.search(/translateX/) !== -1 ? /^translateX\((\-?\d+)\)?/ig.exec(targetEl.style.webkitTransform)[1] : 0);
    console.log(touchOffsetX);
    if (Math.abs(TranslateXnow) > 200) {
      return;
    }
    if (this.touchStartX - coordinate.screenX > 0) { //左滑动

      if (this.maxOffsetLength + TranslateXnow <= 0) {

        this.renderer.setStyle(targetEl, 'transform', `translateX(${ -this.maxOffsetLength }px)`);

        return;
      }
      this.renderer.setStyle(targetEl, 'transform', `translateX(${ TranslateXnow - touchOffsetX }px)`);

    } else if (this.touchStartX - coordinate.screenX < 0) { //右滑动
      if (TranslateXnow >= 0) {
        this.renderer.setStyle(targetEl, 'transform', `translateX(0px)`);
        return;
      }
      this.renderer.setStyle(targetEl, 'transform', `translateX(${ TranslateXnow - touchOffsetX }px)`);
    } else {
      console.log('error');
    }
    this.touchLastX = event.changedTouches[0].screenX; //事件结尾时，将现在的x坐标记录下来
  }


  private autoScroll(TranslateXnow, animatTo, targetEl) {

    this.renderer.setStyle(targetEl, 'transform', `translateX(${animatTo}px)`);
  }

}
