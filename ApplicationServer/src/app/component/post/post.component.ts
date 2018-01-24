import { Component, OnInit } from '@angular/core';
import { RestItemService } from '../../common/rest-item.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent extends RestItemService implements OnInit {

  ngOnInit() {
    this.baseUrl = "posts/id/";
    this.route.paramMap.subscribe(params => { 
        this.resetItem(params.get("id"));
      });
  }

  // TODO submit to add comment
  submitComment() {
    this.httpCallService.post(this.globals.apiUrl + "posts/" + this.dataItem._id, this.dataSendItem,
      data => { this.dataItem = data; this.error = ""; this.dataList.unshift(this.dataItem); },
      err => { this.dataItem = {}; this.error = err.error.err; }
    ); 
  }

}
