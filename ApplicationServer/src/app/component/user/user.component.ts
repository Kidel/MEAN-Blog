import { Component, OnInit } from '@angular/core';
import { RestItemService } from '../../common/rest-item.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends RestItemService implements OnInit {

  ngOnInit() {
    this.baseUrl = "users/id/";
    this.route.paramMap.subscribe( params => { 
        this.resetItem(params.get("id"));
      });
  }

}


