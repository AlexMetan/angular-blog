import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { BannerComponent } from './components/banner/banner.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BlogPostSingleComponent } from './components/blog-post-single/blog-post-single.component';
import { TrimWordsPipe } from './pipes/trim-words.pipe';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AddPostPageComponent } from './components/add-post-page/add-post-page.component';
import { EditBlogPostSingleComponent } from './components/edit-blog-post-single/edit-blog-post-single.component';
import { EditBlogPageComponent } from './components/edit-blog-page/edit-blog-page.component';
import { EditBlogPostComponent } from './components/edit-blog-post/edit-blog-post.component';
import { BgUrlDirective } from './directives/bg-url.directive';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { NoHTMLPipe } from './pipes/no-html.pipe';
import { AuthGuardService } from './services/auth-guard.service';



const route:Routes=[
  { path:"",component:BlogPageComponent },
  { path:"post",component:BlogPostSingleComponent },
  { path:"add-post",component:AddPostPageComponent,canActivate:[AuthGuardService] },
  { path:"edit-post",component:EditBlogPageComponent,canActivate:[AuthGuardService] },
  { path:"edit-my-post",component:EditBlogPostSingleComponent,canActivate:[AuthGuardService] },
  { path:"sign-in",component:LoginPageComponent },
  { path:"sign-up",component:RegistrationPageComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogPageComponent,
    BannerComponent,
    BlogPostComponent,
    BlogPostSingleComponent,
    TrimWordsPipe,
    RegistrationPageComponent,
    LoginPageComponent,
    AddPostPageComponent,
    EditBlogPageComponent,
    EditBlogPostComponent,
    EditBlogPostSingleComponent,
    BgUrlDirective,
    TextEditorComponent,
    NoHTMLPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(route),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
