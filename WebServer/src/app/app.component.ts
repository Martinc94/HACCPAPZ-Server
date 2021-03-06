
import { Component } from '@angular/core';
import { AuthenticationService } from './login.component/login.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

//every page is injected into this page
export class AppComponent {
  title = 'haccpapz';
  public token: string;
  public userName: string;
  
  constructor(
        private authenticationService: AuthenticationService) {
            this.getUserName(); 
  }

  //get user name from storage
  //used to display username on each page
  getUserName(){
    this.userName= this.authenticationService.userName;

            if(this.userName==undefined){
              try {
                var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                this.userName = currentUser.username;        
              } catch (error) {
                this.userName = null;
              }
            }//end if

    return this.userName;
  }
}