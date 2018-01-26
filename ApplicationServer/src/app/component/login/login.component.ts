import { Component, OnInit } from '@angular/core';
import { RestItemService } from '../../common/rest-item.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends RestItemService implements OnInit {

  showLogin:boolean;

  ngOnInit() {
    this.serviceName = "LoginComponent";
    this.init();
    if(this.globals.apiUrl === "") { // API url still not ready, subscribing
      this.globals.gotConfig.subscribe(
        (data:boolean) => { 
        this.checkLogin();
      })
    }
    else { 
      this.checkLogin();
    }
  }

  init() {
    this.baseUrl = "login/";
    this.globals.logged = false;
    this.showLogin = false;
    this.error = "";
    this.globals.currentUser = {};
  }

  loginMessageHandler = data => { 
    this.globals.logged = data.message.logged; 
    this.showLogin = !this.globals.logged;
    this.globals.currentUser = data.message.user; 
    this.error = this.globals.logged ? "" : data.err;
  }

  loginErrorHandler = err => { 
    console.log(err); 
    this.globals.logged = false; 
    this.showLogin = true;
    this.globals.currentUser = {}; 
    this.error = err.error.err || err.error.message || err.statusText;
  }

  checkLogin() {
    this.httpCallService.get(this.globals.apiUrl + this.baseUrl, 
      this.loginMessageHandler,
      this.loginErrorHandler
    ); 
  }

  login() {
    this.httpCallService.post(this.globals.apiUrl + this.baseUrl, this.dataSendItem,
      this.loginMessageHandler,
      this.loginErrorHandler
    ); 
  }

  logout(event) {
    event.preventDefault();
    this.httpCallService.delete(this.globals.apiUrl + this.baseUrl,
      this.loginMessageHandler,
      this.loginErrorHandler
    ); 
  }

  submit() {
    this.login();
  }

}
