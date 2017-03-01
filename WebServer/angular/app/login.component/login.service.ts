//Adapted from http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

//This service manages Login
@Injectable()
export class AuthenticationService {
    public token: string;
    public userName: string;
 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    //Passes Login info to server and handles returned data
    login(username, password): Observable<boolean> {
        return this.http.post('http://haccpapz.northeurope.cloudapp.azure.com:8080/api/authenticate',({ email: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;      

                if (token) {
                    // set token property
                    this.token = token;
                    this.userName=username;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    //logout the user and remove stored data
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.userName = null;
        localStorage.removeItem('currentUser');
    }
}