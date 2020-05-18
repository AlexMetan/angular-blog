import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
   
  @Input() text:string;
  @ViewChild("editor",{static:false}) editor: ElementRef;
  currentText:string;
  editedText:string;
  ngOnInit() {    
    this.currentText=this.text;   
  }
  //  Set text after view load
  ngAfterViewInit(){
    if(typeof this.currentText!=='undefined')
      this.editor.nativeElement.innerHTML=this.currentText;
  }
  //  text style ** value=bold||italic 
  textStyle(value:string){
    document.execCommand(value, false, null);    
   
  }
  //  rewrite text var
  getText(){
    return this.editor.nativeElement.innerHTML;    
  }
}
