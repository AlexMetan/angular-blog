import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent {

  allPost=[];
  filter;
  //  Filter params
  optionParams=[
    { label:'Author',type:'author' },
    { label:'Title',type:'title' },
    { label:'Date',type:'date' }    
   ];
  selectedType="author";
  filterParam;

  //  clear filter input
  clearInput(){
    this.filterParam='';
  }
}
