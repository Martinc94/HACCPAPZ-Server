//Adapted from http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial

import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
 
//This component manages the authentication for admins
@Injectable()
export class AdminGuard implements CanActivate {
    public isAdministrator: boolean;
 
    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            var user = JSON.parse(localStorage.getItem('currentUser'));
            this.isAdministrator = user.admin;

            if(this.isAdministrator==true){
                 return true;
            }
        }
 
        // not admin so redirect to homepage
        this.router.navigate(['/home']);
        return false;
    }
}