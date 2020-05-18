import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBgUrl]'
})
export class BgUrlDirective implements OnInit {
@Input() imgName:string;
  constructor(private el:ElementRef) {
  }
  ngOnInit(): void {
    //  set background img 
    this.el.nativeElement.style.background='url(.././assets/img/'+this.imgName+')';
  }
}
