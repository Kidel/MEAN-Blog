import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { HttpCallsService } from './common/http-calls.service';

@Injectable()
export class Globals {

    constructor(private httpCallService:HttpCallsService) {
        httpCallService.get(this.configUrl, 
            data => { 
                this.apiUrl = (<any>data).restServerUrl; 
                console.log("Loaded API url from config: " + this.apiUrl);
                this.gotConfig.emit(true);
            },
            err => { 
                console.log("No config found, app will not work");
                this.gotConfig.emit(false); 
            }
        );
    }

    gotConfig:EventEmitter<boolean> = new EventEmitter<boolean>();

    title:string = "MEAN Blog";
    configUrl:string = "assets/config.json";
    apiUrl:string = "";

    // cache
    logged:boolean = false;
    auth:number = 0;
}
