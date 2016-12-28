import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx'
import '../rxjs-operators';
import { TempRec} from '../classes/TempRec/TempRec';
 
@Injectable()
export class FormService {
    public token: string;
    private authHeader = new Headers();
    //private url = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getFitnessToWork';
    private tempRecUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getTempRecords';
    
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser.token;
       
        this.authHeader.append('Authorization',this.token);
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

    getTempForms (): Observable<TempRec[]> {
        return this.http.get(this.tempRecUrl,({ headers: this.authHeader}))
                        .map(this.extractData)
                        .catch(this.handleError);
      }
   
}