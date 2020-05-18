import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit, OnDestroy {
  constructor(private request:RequestService) { } 
  sub1:Subscription;
  sub2:Subscription;
  allPost;
  filteredPost;
  havePost=true;
  ngOnInit() {
    this.getAllPost();
  }
  //  get all blog posts from reques service
  getAllPost(){
    this.sub1=this.request.getBlogPosts().subscribe(resp=>{    
      this.allPost=this.filteredPost=resp;  
      this.checkPost();    
    });    
  }
  //  filter post by params
  filterArray(value:any,type:any)
  {
    //  check if any post exist
    if(this.allPost[0]){
      this.filteredPost=this.allPost.filter(arr=>arr[type].toLowerCase().includes(value.toLowerCase()));    
      this.checkPost();
      
    }
  }
  //  check if post does not null
  checkPost(){
    if(this.filteredPost[0])
      this.havePost=true;
    else
      this.havePost=false;
  }
  //  destroy subscription
  ngOnDestroy(){
    if(this.sub1)
      this.sub1.unsubscribe();    
    if(this.sub2)
      this.sub2.unsubscribe();  
  }

} 
