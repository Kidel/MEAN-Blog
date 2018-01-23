import { Component, OnInit } from '@angular/core';
import { RestItemService } from '../../common/rest-item.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends RestItemService implements OnInit {

  logged:boolean;
  showLogin:boolean;
  error:string;
  email:string;

  ngOnInit() {
    this.baseUrl = "login/";
    this.logged = false;
    this.showLogin = false;
    this.error = "";
    this.email = "";
    this.checkLogin();
  }

  checkLogin() {
    this.httpCallService.get(this.globals.apiUrl + this.baseUrl, 
      data => { 
        this.logged = data.message.logged; 
        this.showLogin = !this.logged;
        this.email = data.message.email; 
        this.error = this.logged ? "" : data.err;
      },
      err => { 
        console.log(err); 
        this.logged = false; 
        this.showLogin = true;
        this.email = ""; 
        this.error = err;
      }
    ); 
  }

}
