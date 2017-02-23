import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx'
import '../rxjs-operators';

import {FoodAnalysis} from '../classes/FoodAnalysis/FoodAnalysis';
import {FormDates} from '../classes/FormDates/FormDates';
 
@Injectable()
export class AnalysisService {
    public token: string;
    private authHeader = new Headers();
    //Urls
    private foodTrendUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getDeliveryTrend';
    private formDateUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getFormDate';

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

    getFoodAnalysisForms (): Observable<FoodAnalysis[]> {
        return this.http.get(this.foodTrendUrl,({ headers: this.authHeader}))
                        .map(this.extractData)
                        .catch(this.handleError);
    }  

    getFormDates (): Observable<FormDates[]> {
        return this.http.get(this.formDateUrl,({ headers: this.authHeader}))
                        .map(this.extractData)
                        .catch(this.handleError);
    }  
}