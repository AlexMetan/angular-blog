import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:string;
  menuOpened=false;
  menuElement;
  constructor(
    private auth:AuthService,
    private router:Router
    ){}
  ngOnInit() {
    //  get current user name
    this.user=this.auth.getUserName();
  }
  //  on click log out icon
  logOut(){
    this.auth.logOut();
    this.router.navigate(['sign-in']);
  }
  //  show/hide mobile menu
  mobileMenuBtnClick(){
    this.menuElement =document.querySelector('.menu-section');
    this.menuOpened=!this.menuOpened;
    if(!this.menuOpened){
      this.menuElement.classList.remove('menu-visible');
    }
    else{
      this.menuElement.classList.add('menu-visible');
    }
  }
}
