
import { Component } from '@angular/core';
import { AuthenticationService } from './login.component/login.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {
  title = 'haccpapz';
  public token: string;
  
  constructor(
        private authenticationService: AuthenticationService) {

        }
}