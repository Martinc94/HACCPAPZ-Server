import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Temp} from '../classes/Temp/temp';
import {Observable} from 'rxjs/Rx'
import '../rxjs-operators';
 
@Injectable()
export class TempService {
    public token: string;
    private authHeader = new Headers();
    private url = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getFridgetemp';
    
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser.token;
       
        this.authHeader.append('Authorization',this.token);
    }

    getTempForms (): Observable<Temp[]> {
        return this.http.get(this.url,({ headers: this.authHeader}))
                        .map(this.extractData)
                        .catch(this.handleError);
      }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
      }

    private handleError (error: Response | any) {
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
      errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }
   
}