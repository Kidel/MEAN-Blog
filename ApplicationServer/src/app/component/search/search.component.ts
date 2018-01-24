import { Component, OnInit } from '@angular/core';
import { RestItemService } from '../../common/rest-item.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends RestItemService implements OnInit {

  ngOnInit() {
    this.baseUrl = "posts/search/"; // TODO (still to be implemented on server)
  }

}
