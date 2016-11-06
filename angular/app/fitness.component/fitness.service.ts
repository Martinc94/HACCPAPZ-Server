import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
@Injectable()
export class FitnessService {
    public token: string;
    private authHeader = new Headers();
    
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser.token;
       
        this.authHeader.append('Authorization',this.token);
    }

    getFitnessForms(){
        return this.http.get('http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getFitnessToWork',({ headers: this.authHeader}))
            .map(res=> res.json());
    }

    getdate(){
        return this.http.get('http://date.jsontest.com/')
            .map(res=> res.json());
    }
}