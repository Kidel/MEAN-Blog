import { Component, OnInit } from '@angular/core';
import { RestItemService } from '../../common/rest-item.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent extends RestItemService implements OnInit {

  title:string = this.globals.title;

  ngOnInit() {
    this.baseUrl = "posts/";
    this.route.paramMap.subscribe(params => {
      this.resetList("1");
    });
  }

}
