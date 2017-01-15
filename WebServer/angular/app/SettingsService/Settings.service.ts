import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx'
import '../rxjs-operators';
import {Food} from '../classes/Settings/Food/Food';
import {Supplier} from '../classes/Settings/Supplier/Supplier';
import {Fridge} from '../classes/Settings/Fridge/Fridge';
 
@Injectable()
export class SettingsService {
    public token: string;
    private authHeader = new Headers();
    //Urls
    private supplierUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getsuppliers';
    private foodUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getfood';
    private fridgeUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getrefridgerationUnit';

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

    getFoodSettings (): Observable<Food[]> {
        return this.http.get(this.foodUrl,({ headers: this.authHeader}))
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getSupplierSettings (): Observable<Supplier[]> {
        return this.http.get(this.supplierUrl,({ headers: this.authHeader}))
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getFridgeSettings (): Observable<Fridge[]> {
        return this.http.get(this.fridgeUrl,({ headers: this.authHeader}))
                        .map(this.extractData)
                        .catch(this.handleError);
    }

}