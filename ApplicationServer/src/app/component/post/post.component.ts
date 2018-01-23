import { Component, OnInit } from '@angular/core';
import { RestItemService } from '../../common/rest-item.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent extends RestItemService implements OnInit {

  ngOnInit() {
    this.baseUrl = "posts/";
    this.route.paramMap.subscribe( params => { 
        this.resetItem(params.get("id"));
      });
  }

}
