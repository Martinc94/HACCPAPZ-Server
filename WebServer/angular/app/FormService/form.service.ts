import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx'
import '../rxjs-operators';
import {TempRec} from '../classes/TempRec/TempRec';
import {Hothold} from '../classes/Hothold/Hothold';
import {HygIns} from '../classes/HygIns/HygIns';
import {HygTrain} from '../classes/HygTrain/HygTrain';
import {Transport} from '../classes/Transport/Transport';

 
@Injectable()
export class FormService {
    public token: string;
    private authHeader = new Headers();
    //Urls
    private tempRecUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getTempRecords';
    private hotholdUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getHothold';
    private hygieneInsUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getHygieneInspection';
    private hygieneTrainUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getHygieneTraining';
    private transportUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getTransport';
    
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

    getHotholdForms (): Observable<Hothold[]> {
        return this.http.get(this.hotholdUrl,({ headers: this.authHeader}))
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getHygInsForms (): Observable<HygIns[]> {
        return this.http.get(this.hygieneInsUrl,({ headers: this.authHeader}))
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getHygTrainForms (): Observable<HygTrain[]> {
        return this.http.get(this.hygieneTrainUrl,({ headers: this.authHeader}))
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getTransportForms (): Observable<Transport[]> {
        return this.http.get(this.transportUrl,({ headers: this.authHeader}))
                        .map(this.extractData)
                        .catch(this.handleError);
    }
   
}