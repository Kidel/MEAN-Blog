import { Component, OnInit } from '@angular/core';
import { RestItemService } from '../../common/rest-item.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends RestItemService implements OnInit {

  ngOnInit() {
    this.baseUrl = "users/";
    this.resetList("");
  }

  submitUser() {
    this.submit();
  }
}
