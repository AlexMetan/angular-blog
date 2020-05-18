import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Md5 } from 'md5-typescript';


import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/models/User';
@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {

  registerForm:FormGroup;
  sub1:Subscription;
  sub2:Subscription;  
  userExist=false;
  errorName=false;
  password=false;
  
  constructor(
    private requestService:RequestService,
    private router:Router
    ) { }

  ngOnInit() {
    this.initForm();
  }
  // Registration form init  
  initForm(){
    this.registerForm = new FormGroup({     
      'login':new FormControl(null,[Validators.required]),
      'password':new FormControl(null,[Validators.required,Validators.minLength(6)])    
    });
  }
  
  onSubmit(loginForm:FormGroup){
    //  create new user object
    let login=loginForm.value.login;
    let password=Md5.init(loginForm.value.password); //password to md5
    const newUser=new User(login,password); 
    
    this.sub1=this.requestService.getUserByLogin(login).subscribe(resp=>{     
      // if new login does not exist ** response {message : no user found}      
      if(resp["message"]){
        //  create new user and redirect to main page
        this.sub2= this.requestService.createNewUser(newUser).subscribe(user=>{
          this.userExist=false;
          this.router.navigate(['']);
        });
      }
      else {
      // show error  
        this.userExist=true;
      }
    })
  }  
  //  hide input errors
  hideError(){
    this.userExist=false;
  }
  // Destroy subscription
  ngOnDestroy() {
    if(this.sub1)
      this.sub1.unsubscribe();
    if(this.sub2)
      this.sub2.unsubscribe();
  }
}
