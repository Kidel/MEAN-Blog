import { Component, OnInit } from '@angular/core';
import { RestItemService } from '../../common/rest-item.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent extends RestItemService implements OnInit {

  ngOnInit() {
    this.baseUrl = "posts/";
    this.resetList();
  }

}