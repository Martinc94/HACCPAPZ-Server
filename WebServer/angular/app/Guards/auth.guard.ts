//Adapted from http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
//This component manages the authentication
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}