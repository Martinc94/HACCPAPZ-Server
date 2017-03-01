import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx'
import '../rxjs-operators';
import {TempRec} from '../classes/TempRec/TempRec';
import {Hothold} from '../classes/Hothold/Hothold';
import {HygIns} from '../classes/HygIns/HygIns';
import {HygTrain} from '../classes/HygTrain/HygTrain';
import {Transport} from '../classes/Transport/Transport';
import {Fitness} from '../classes/Fitness/fitness';
import {Temp} from '../classes/Temp/temp';
import {FoodDelivery} from '../classes/FoodDelivery/FoodDelivery';

//This Servive manages the getting Forms
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
    private fitnessUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getFitnessToWork';
    private fridgeTempUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getFridgetemp';
    private foodDeliveryUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getFoodDelivery';

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser.token;
        
        //sets Authorization in Header
        this.authHeader.append('Authorization',this.token);
    }

    //converts from json to Object
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

    //Each method returns an Observable of Each form type for each form

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

    getFitnessForms (): Observable<Fitness[]> {
        return this.http.get(this.fitnessUrl,({ headers: this.authHeader}))
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getFridgeTempForms (): Observable<Temp[]> {
        return this.http.get(this.fridgeTempUrl,({ headers: this.authHeader}))
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getfoodDeliveryForms (): Observable<FoodDelivery[]> {
        return this.http.get(this.foodDeliveryUrl,({ headers: this.authHeader}))
                        .map(this.extractData)
                        .catch(this.handleError);
    }  
}