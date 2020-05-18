import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Blog } from 'src/app/models/Blog';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-edit-blog-post-single',
  templateUrl: './edit-blog-post-single.component.html',
  styleUrls: ['./edit-blog-post-single.component.css']
})
export class EditBlogPostSingleComponent implements OnInit,OnDestroy {

  constructor(
    private activatedRoute:ActivatedRoute,
    private requestService:RequestService,
    private router:Router
    ) { }
    
  imgUrl:string;  
  formData:FormData;

  paramId:string;
  paramAuthor:string;

  sub1:Subscription;
  sub2:Subscription;
  sub3:Subscription;
  sub4:Subscription;

  postTitle:string;
  postText:string;
  
  loaded=false;
  updatedPost:Blog;
  nullFields=false;
  ngOnInit() {    
    this.getCurrentBlogId();
  }
  getCurrentBlogId(){
    //  get query params
    this.sub1 =this.activatedRoute.queryParams.subscribe(params=>{
      this.paramId=params.id;
      this.paramAuthor=params.author;
      this.getPostByIdUser();
    })
  }
  //  Get current post 
  getPostByIdUser(){
    this.sub2=this.requestService.getPostByAuthorAndId(this.paramId,this.paramAuthor).subscribe(resp=>{
      // if post does not exist => response {message : no post found}      
      const currentPost=resp[0];
      this.postTitle=currentPost.title;       
      this.postText=currentPost.text;
      this.loaded=true;  
      // create object for updated post  
      this.updatedPost= new Blog(this.postTitle,currentPost.author,currentPost.date,this.postText,currentPost.img_link,currentPost.id);      
    });
  }
 
  // update post on btn "update" click 
  updatePost(textEditor){
    
    //  update object fields
    this.updatedPost.title=this.postTitle;
    this.updatedPost.text=textEditor.getText();    
    // if fields null show error
    if(this.updatedPost.title==""||this.updatedPost.text==""){
      this.nullFields=true;
      setTimeout(()=>{
        this.nullFields=false;
      },1000);  
    }
    else{
      this.loaded=false;
      //  update current post
      this.sub3=this.requestService.updatePost(this.updatedPost).subscribe(resp=>{
        //  redirect to main page
        this.router.navigate(['']);
      });
    }
  } 
  // delete post on btn "delete" click 
  deletePost(){
    this.loaded=false;
    this.router.navigate(['']);
    this.sub4=this.requestService.deletePost(this.paramId).subscribe();
  }

  // Destroy subscription
  ngOnDestroy(){
    if(this.sub1)
      this.sub1.unsubscribe();
    if(this.sub2)
      this.sub1.unsubscribe();
    if(this.sub3)
      this.sub3.unsubscribe();
  }

}
