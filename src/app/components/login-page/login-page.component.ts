import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Md5 } from 'md5-typescript';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit,OnDestroy {

  @Output() myEvent= new EventEmitter();
  loginForm;
  sub1:Subscription;
  sub2:Subscription;
  authError=false;
  path:string;
  constructor(
    private activatedRoute:ActivatedRoute,
    private requestService:RequestService,
    private auth:AuthService,
    private router:Router
    ) { }

  ngOnInit() {
    this.initForm();
    this.getPath();
  }
  //  get redirect path from query params
  getPath(){
    this.sub1 =this.activatedRoute.queryParams.subscribe(params=>{
      this.path=params.path;
      if(typeof this.path==="undefined"){
        this.path='';
      }
    });
  }
  initForm(){
    //  init sign in form
    this.loginForm = new FormGroup({     
      'login':new FormControl(null,[Validators.required]),
      'password':new FormControl(null,[Validators.required,Validators.minLength(6)])    
    });
  }
  onSubmit(loginForm:FormGroup){
    this.hideError();
    //  get value from input
    let login=loginForm.value.login;
    let password=Md5.init(loginForm.value.password);
    //  check get user by login && password
    this.sub2=this.requestService.getUserByFullData(login,password).subscribe(resp=>{
      // if login does not exist => response {message : no user found}    
      if(resp["message"]){
        //  show error
        this.authError=true;
      }
      else{
        const currentUser=new User(login,password);
        this.logIn(currentUser);
      }
    });
  }
  
  logIn(user:User){
    this.authError=false;
    this.auth.logIn(user.login);
    this.router.navigate([this.path]);  
  }
  //  hide input error
  hideError(){
    this.authError=false;
  }
  //  Destroy subscription
  ngOnDestroy() {
    if(this.sub1)
      this.sub1.unsubscribe();
    if(this.sub2)
      this.sub1.unsubscribe();
  }
}
