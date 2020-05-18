import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Blog } from '../models/Blog';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }
 
  //*******************
  //***BLOG REQUESTS***
  //*******************

  //  Get all blog posts
  getBlogPosts(){
    return this.http.get(`http://rest-service.madbunny.pl/api/blog/read.php`);
  }
  //  Get all blog posts
  getBlogPostbyId(id:string){
    return this.http.get(`http://rest-service.madbunny.pl/api/blog/read.php`,{params:{id}});
  }
  //  get post by author/login
  getPostByAuthor(author:string){
    return this.http.get(`http://rest-service.madbunny.pl/api/blog/read.php`,{params:{author}});
  }
  //  get post by author/login&&post id
  getPostByAuthorAndId(id:string,author:string,){
    return this.http.get(`http://rest-service.madbunny.pl/api/blog/read.php`,{params:{id,author}});
  }
  //  create new post
  createNewPost(post:Blog){
    return this.http.post(`http://rest-service.madbunny.pl/api/blog/create.php`,JSON.stringify(post));
  }
  updatePost(post:Blog){
    return this.http.put(`http://rest-service.madbunny.pl/api/blog/update.php`,JSON.stringify(post));
  }
  deletePost(id:string){
    return this.http.delete(`http://rest-service.madbunny.pl/api/blog/delete.php`,{params:{id}});
  }

  //*******************
  //***USER REQUESTS***
  //*******************
  
  // get user by login ** sign up validation
  getUserByLogin(login:string){
    return this.http.get(`http://rest-service.madbunny.pl/api/users/read.php`,{params:{login}});
  }
  // get user by login && password ** sing in
  getUserByFullData(login:string,password:string){
    return this.http.get(`http://rest-service.madbunny.pl/api/users/read.php`,{params:{login,password}});
  }
  //create new user
  createNewUser(user:User){
    return this.http.post(`http://rest-service.madbunny.pl/api/users/create.php`,JSON.stringify(user));
  } 

}
