import { Component, OnInit } from '@angular/core';

import { Globals } from '../../globals';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  title:string = '';

  constructor(private globals:Globals) { }

  ngOnInit() {
    this.title = this.globals.title;
  }

}
