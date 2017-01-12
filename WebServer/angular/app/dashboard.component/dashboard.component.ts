
// System imports
import { Component }    from '@angular/core';
import { Router }       from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'dashboard-page',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {
    title = "User Dashboard";
    public userName: string;

  constructor() {
    try {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.userName = currentUser.username;
      
    } catch (error) {
      this.userName = null;
    }
  }

}