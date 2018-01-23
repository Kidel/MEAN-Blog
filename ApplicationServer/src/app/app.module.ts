import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, ParamMap } from '@angular/router';

import { AppComponent } from './app.component';
import { FooterComponent } from './template/footer/footer.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { PostsComponent } from './component/posts/posts.component';
import { UsersComponent } from './component/users/users.component';
import { PostComponent } from './component/post/post.component';
import { UserComponent } from './component/user/user.component';
import { SplashComponent } from './component/splash/splash.component';
import { LoginComponent } from './component/login/login.component';

import { HttpCallsService } from './common/http-calls.service';
import { RestItemService } from './common/rest-item.service';

import { Globals } from './globals';

const appRoutes:Routes = [
  {
    path: '', 
    component: SplashComponent
  },
  {
    path: 'users', 
    component: UsersComponent
  },
  {
    path: 'users/id/:id', 
    component: UserComponent
  },
  {
    path: 'posts', 
    component: PostsComponent
  },
  {
    path: 'posts/:page', 
    component: PostsComponent
  },
  {
    path: 'posts/id/:id', 
    component: PostComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    PostsComponent,
    UsersComponent,
    PostComponent,
    UserComponent,
    SplashComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    RouterModule.forRoot(appRoutes)
  ],
  providers: [Globals, HttpCallsService, RestItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
