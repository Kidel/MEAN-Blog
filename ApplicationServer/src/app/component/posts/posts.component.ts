import { Component, OnInit } from '@angular/core';
import { RestItemService } from '../../common/rest-item.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent extends RestItemService implements OnInit {

  hideSubmit:boolean = false;

  ngOnInit() {
    this.serviceName = "PostsComponent";
    this.baseUrl = "posts/";
    this.route.paramMap.subscribe(params => {
      this.resetList(params.get("page") || "");
      if(params.get("tag")) {
        this.baseUrl = "posts/tag/";
        this.hideSubmit = true;
        this.resetList(params.get("tag"));
      }
      else {
        this.hideSubmit = false;
      }
    });
  }

}