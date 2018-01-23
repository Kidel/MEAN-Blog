import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/retry';


@Injectable()
export class HttpCallsService {

  constructor(protected http:HttpClient) { }

  get(url:string, callback, callbackErr) {
    console.log("GET request to: " + url);
    this.http.get(url).retry(3).subscribe(
      callback,
      callbackErr
    );
  }

  post(url:string, data, callback, callbackErr) {
    console.log("POST request to: " + url);
    this.http.post(url, data).retry(3).subscribe(
      callback,
      callbackErr
    );
  }

  put(url:string, data, callback, callbackErr) {
    console.log("PUT request to: " + url);
    this.http.put(url, data).retry(3).subscribe(
      callback,
      callbackErr
    );
  }

  delete(url:string, callback, callbackErr) {
    console.log("DELETE request to: " + url);
    this.http.delete(url).retry(3).subscribe(
      callback,
      callbackErr
    );
  }

}
