import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpCallsService } from './http-calls.service';
import { Globals } from '../globals';

@Injectable()
export class RestItemService {

  baseUrl:string = "";
  dataList:any = [];
  dataItem:any = {};

  constructor(protected httpCallService:HttpCallsService, protected globals:Globals, protected route:ActivatedRoute) { }

  reset(callback) {
    if(this.globals.apiUrl === "") { // API url still not ready, subscribing
      this.globals.gotConfig.subscribe(
          (data:boolean) => { 
            if(data) callback(); 
        })
    }
    else { 
        console.log(this.globals.apiUrl);
        callback();
      }
  }

  resetList() {
    return this.reset(() => { this.getItemList() });
  }

  resetItem(id:string) {
    return this.reset(() => { this.getItemFromId(id); });
  }

  getItemList() {
    this.httpCallService.get(this.globals.apiUrl + this.baseUrl, 
      data => { this.dataList = data; },
      err => { this.dataList = {}; console.log(err); }
    ); 
  }

  getItemFrom(subpath:string, what:string) {
    this.httpCallService.get(this.globals.apiUrl + this.baseUrl + subpath + what, 
      data => { this.dataItem = data; },
      err => { this.dataItem = {}; console.log(err); }
    ); 
  }

  getItemFromId(id:string) {
    this.getItemFrom("", id);
  }

  postItem(formData:string) {
    this.httpCallService.post(this.globals.apiUrl + this.baseUrl, formData,
      data => { this.dataItem = data; },
      err => { this.dataItem = {}; console.log(err); }
    ); 
  }

  editItem(id:string, formData:string) {
    this.httpCallService.put(this.globals.apiUrl + this.baseUrl + id, formData,
      data => { this.dataItem = data; },
      err => { this.dataItem = {}; console.log(err); }
    ); 
  }

  deleteItem(id:string) {
    this.httpCallService.delete(this.globals.apiUrl + this.baseUrl + id, 
      data => { this.dataItem = data; },
      err => { this.dataItem = {}; console.log(err); }
    ); 
  }

}
