import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login.component/login.service';
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

//This component manages the Login page
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }
    
    //destroy user saved  on page load
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
 
    //pass user info to login service and handle error/Sredirect if successful
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/dashboard']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}
