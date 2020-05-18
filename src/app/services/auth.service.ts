import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated=false;
  private currentUserName="";
  logIn(userName){
    this.currentUserName=userName;
    this.isAuthenticated=true;
  }
  logOut(){
    this.isAuthenticated=false;
    this.currentUserName="";
  }
  isLoggedIn(){
    return this.isAuthenticated;
  }
  getUserName(){
    return this.currentUserName;
  }
  
}
