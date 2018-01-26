import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { HttpCallsService } from './http-calls.service';
import { Globals } from '../globals';

@Injectable()
export class RestItemService {

  serviceName:string="any";
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

  dataListHandler = data => { this.dataList = data; this.error = "" };
  dataListErrorHandler = err => { this.dataList = []; this.error = err.error.err || err.error.message; };

  dataItemHandler = data => { this.dataItem = data; this.error = "" };
  dataItemPostedHandler = data => { this.dataItem = data; this.error = ""; this.dataList.unshift(this.dataItem); this.globals.newSubmission.emit(this.serviceName); };
  dataItemErrorHandler = err => { this.dataItem = {}; this.error = err.error.err || err.error.message; };

  getItemList(page:string) {
    this.httpCallService.get(this.globals.apiUrl + this.baseUrl + page, 
      this.dataListHandler,
      this.dataListErrorHandler
    ); 
  }

  getItemFrom(subpath:string, what:string) {
    this.httpCallService.get(this.globals.apiUrl + this.baseUrl + subpath + what, 
      data => { this.dataItem = data; this.error = "" },
      err => { this.dataItem = {}; this.error = err.error.err || err.error.message; }
    ); 
  }

  getItemFromId(id:string) {
    this.getItemFrom("", id);
  }

  postItem(formData:any) {
    this.httpCallService.post(this.globals.apiUrl + this.baseUrl, formData,
      this.dataItemPostedHandler,
      this.dataItemErrorHandler
    ); 
  }

  editItem(id:string, formData:string) {
    this.httpCallService.put(this.globals.apiUrl + this.baseUrl + id, formData,
      this.dataItemHandler,
      this.dataItemErrorHandler
    ); 
  }

  deleteItem(id:string) {
    this.httpCallService.delete(this.globals.apiUrl + this.baseUrl + id, 
      this.dataItemHandler,
      this.dataItemErrorHandler
    ); 
  }

  gravatarUrl(str:string) {
    if(str) {
      let md5 = new Md5();
      md5.appendStr(str);
      return md5.end().toString();
    }
  }
}
