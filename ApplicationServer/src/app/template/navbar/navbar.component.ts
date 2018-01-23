import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Globals } from '../../globals';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title:string = '';
  activeRoute:string;
  offcanvas:boolean = false;

  constructor(private globals:Globals, private _router: Router) { 
    // subscribing to route change
    _router.events.subscribe(
      event => {
        this.activeRoute = _router.url;
      }
    );
  }

  ngOnInit() {
    this.title = this.globals.title;
  }

  toggleOffcanvas() {
    this.offcanvas = !this.offcanvas;
  }

}
