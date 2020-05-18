import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-post-single',
  templateUrl: './blog-post-single.component.html',
  styleUrls: ['./blog-post-single.component.css']
})
export class BlogPostSingleComponent implements OnInit,OnDestroy {

  constructor(
    private activatedRoute:ActivatedRoute,
    private requestService:RequestService
  ) { }
  
  @ViewChild("textArea",{static:false}) textArea: ElementRef;
  sub1:Subscription;
  sub2:Subscription;
  post={title:'',author:'',date:''};
  ngOnInit() {
    this.getPostId();    
  }
  
  // get page param id
  getPostId(){
    this.sub1 =this.activatedRoute.queryParams.subscribe(params=>{
      let param=params.id;
      this.getBlogPostById(param);
    })
  }
  //  get post by id from request service
  getBlogPostById(id:string){
    this.sub2=this.requestService.getBlogPostbyId(id).subscribe(resp=>{
      this.post=resp[0];  
      this.setTextAreaContent(resp[0].text);
    });
  } 
  //  set innerHtml from response
  setTextAreaContent(content:string){
    this.textArea.nativeElement.innerHTML=content;   
  }
  //  destroy subscription
  ngOnDestroy(){   
    if(this.sub1)
      this.sub1.unsubscribe();
    if(this.sub2)
      this.sub2.unsubscribe();
  }

}
