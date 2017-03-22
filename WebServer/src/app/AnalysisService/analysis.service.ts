import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx'
import '../rxjs-operators';

import {FoodAnalysis} from '../classes/FoodAnalysis/FoodAnalysis';
import {FoodAnalysisYearly} from '../classes/FoodAnalysisYearly/FoodAnalysisYearly';
import {FormDates} from '../classes/FormDates/FormDates';

//Service that returns date forms were last filled out and food trend analysis 
@Injectable()
export class AnalysisService {
    public token: string;
    private authHeader = new Headers();
    //Url
    private formDateUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getFormDate';

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser.token;

        this.authHeader.append('Authorization', this.token);
    }

    private extractData(res: Response) {
        console.log(res.json);
        let body = res.json();
        console.log(body);
        return body || {};
    }

    private handleError(error: Response | any) {
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

    getFormDates(): Observable < FormDates[] > {
        return this.http.get(this.formDateUrl, ({
                headers: this.authHeader
            }))
            .map(this.extractData)
            .catch(this.handleError);
    }

    getFoodAnalysisForms(url): Observable < FoodAnalysis[] > {
        return this.http.get(url, ({
                headers: this.authHeader
            }))
            .map(this.extractData)
            .catch(this.handleError);
    }

    getFoodAnalysisYearlyForms(url): Observable < FoodAnalysisYearly[] > {
        return this.http.get(url, ({
                headers: this.authHeader
            }))
            .map(this.extractData)
            .catch(this.handleError);
    }  
}