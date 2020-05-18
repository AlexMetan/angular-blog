import { Component, OnDestroy} from '@angular/core';
import { Router} from '@angular/router';
import { formatDate } from '@angular/common';

import { Subscription } from 'rxjs';

import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { Blog } from 'src/app/models/Blog';
@Component({
  selector: 'app-add-post-page',
  templateUrl: './add-post-page.component.html',
  styleUrls: ['./add-post-page.component.css']
})
export class AddPostPageComponent implements OnDestroy {

  constructor(
    private requestService:RequestService,
    private router:Router,
    private auth:AuthService,
    private uploadFile:UploadFileService
    ) { }
  //default photo  
  imgUrl="http://rest-service.madbunny.pl/uploads/img/user_blank.jpg";
  sub1:Subscription;
  sub2:Subscription;
  postTitle:string;
  formData:FormData;
  nullFields=false;
  //max img size ~1.2mb 
  maxImgSize=1258291;
  maxSizeError=false;

  loader=false;

  // update post on btn "update" click 
  createPost(textEditor){
    //  get text from text editor
    const newText=textEditor.getText();
    //  get current date 
    const currentDate = new Date();
    const formatedDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
    //  get author name / current user
    const author=this.auth.getUserName();
    if(newText==""||this.postTitle==""){
      this.nullFields=true;
      setTimeout(()=>{
        this.nullFields=false;
      },1000);      
    }
    else{
      this.loader=true;
      //  upload user photo
      this.sub1=this.uploadFile.uploadFile(this.formData).subscribe(resp=>{    
        //  set img url if uploaded ** else defualt img
        if(resp[0].url){
          this.imgUrl=resp[0].url;
        }
        //  create post object
        let newPost=new Blog(
          this.postTitle,
          author,
          formatedDate,
          newText,
          this.imgUrl
        );
        //  create new post request
        this.sub2= this.requestService.createNewPost(newPost).subscribe(()=>{
          this.router.navigate(['']);
        });
      });
    }    
  }
  //  get file from input
  onFileChange(event,obj){
    const file=event.target.files[0];
    // check file size
    if(file.size<=this.maxImgSize){    
      //  create new formData object
      this.formData= new FormData();
      this.formData.append('avatar',file);

    }
    else{
      // show error and reset input value
      obj.value="";
      this.maxSizeError=true;
      setTimeout(()=>{
        this.maxSizeError=false;
      },1000);
    }
  }
  
  // Destroy subscription
  ngOnDestroy(){
    if(this.sub1)
      this.sub1.unsubscribe();
    if(this.sub2)
      this.sub1.unsubscribe();
  }

}
  
