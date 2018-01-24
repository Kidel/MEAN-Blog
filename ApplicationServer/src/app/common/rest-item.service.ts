import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { HttpCallsService } from './http-calls.service';
import { Globals } from '../globals';

@Injectable()
export class RestItemService {

  baseUrl:string = "";
  dataList:any = [];
  dataItem:any = {};
  dataSendItem:any = {};
  error:string = "";

  constructor(public httpCallService:HttpCallsService, public globals:Globals, public route:ActivatedRoute) { }

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

  resetList(page:string) {
    return this.reset(() => { this.getItemList(page) });
  }

  resetItem(id:string) {
    return this.reset(() => { this.getItemFromId(id); });
  }

  submit() {
    this.postItem(this.dataSendItem);
  }

  getItemList(page:string) {
    this.httpCallService.get(this.globals.apiUrl + this.baseUrl + page, 
      data => { this.dataList = data; this.error = "" },
      err => { this.dataList = []; this.error = err.error.err; }
    ); 
  }

  getItemFrom(subpath:string, what:string) {
    this.httpCallService.get(this.globals.apiUrl + this.baseUrl + subpath + what, 
      data => { this.dataItem = data; this.error = "" },
      err => { this.dataItem = {}; this.error = err.error.err; }
    ); 
  }

  getItemFromId(id:string) {
    this.getItemFrom("", id);
  }

  postItem(formData:any) {
    this.httpCallService.post(this.globals.apiUrl + this.baseUrl, formData,
      data => { this.dataItem = data; this.error = ""; this.dataList.unshift(this.dataItem); },
      err => { this.dataItem = {}; this.error = err.error.err; }
    ); 
  }

  editItem(id:string, formData:string) {
    this.httpCallService.put(this.globals.apiUrl + this.baseUrl + id, formData,
      data => { this.dataItem = data; this.error = "" },
      err => { this.dataItem = {}; this.error = err.error.err; }
    ); 
  }

  deleteItem(id:string) {
    this.httpCallService.delete(this.globals.apiUrl + this.baseUrl + id, 
      data => { this.dataItem = data; this.error = "" },
      err => { this.dataItem = {}; this.error = err.error.err; }
    ); 
  }

  hash(str:string) {
    let md5 = new Md5();
    md5.appendStr(str);
    return md5.end().toString();
  }
}
