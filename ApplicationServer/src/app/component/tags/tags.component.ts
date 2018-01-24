import { Component, OnInit } from '@angular/core';
import { RestItemService } from '../../common/rest-item.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent extends RestItemService implements OnInit {

  ngOnInit() {
    this.baseUrl = "posts/tags/";
    this.resetItem(""); 
  }

}
