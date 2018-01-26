import { Component, OnInit } from '@angular/core';
import { RestItemService } from '../../common/rest-item.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends RestItemService implements OnInit {

  userId:string = null;

  ngOnInit() {
    this.serviceName = "UserComponent";
    this.userId = null;
    this.baseUrl = "users/";
    this.route.paramMap.subscribe(params => { 
      this.userId = params.get("id")
      if(this.userId) {
        this.baseUrl = "users/id/";
        this.resetItem(this.userId);
      }
    });
  }

  // registration if not logged in and if no param id
  register() {
    this.submit();
  }

}


