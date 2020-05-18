import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-blog-post',
  templateUrl: './edit-blog-post.component.html',
  styleUrls: ['./edit-blog-post.component.css']
})
export class EditBlogPostComponent implements OnInit,OnDestroy{
  constructor(
    private request:RequestService,
    private auth:AuthService
    ) { } 
  

  sub1:Subscription;
  sub2:Subscription;
  tekst:string;
  allPost;
  havePost=true;
  ngOnInit() {
    this.getAllPost();
  }
  //  get all posts by author from reques service
  getAllPost(){
    const author= this.auth.getUserName();
    this.sub1=this.request.getPostByAuthor(author).subscribe(resp=>{    
      // if post does not exist => response {message : no post found}    
      if(resp["message"]){   
        this.havePost=false;
      } 
      else {
        this.allPost=resp;
        this.havePost=true;
      }
    });    
  }
  //  destroy subscription
  ngOnDestroy(){
    if(this.sub1)
      this.sub1.unsubscribe();     
  }

}
