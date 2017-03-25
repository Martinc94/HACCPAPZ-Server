
// System imports
import { Component,OnInit}    from '@angular/core';
import { Router }       from '@angular/router';

import { AnalysisService } from '../AnalysisService/analysis.service';
import {FormDates} from '../classes/FormDates/FormDates';
import { Observable }     from 'rxjs/Observable';
import '../rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'dashboard-page',
  templateUrl: 'dashboard.component.html'
})

//This component manages the users dashboard
export class DashboardComponent implements OnInit {
    errorMessage: string;
    title = "User Dashboard";
    public userName: string;
    formDatesForms: FormDates[];
    mode = 'Observable';

    constructor(private router: Router,
        private analysisService: AnalysisService) {
        //gets user info if available
        try {
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.userName = currentUser.username;

        } catch (error) {
            this.userName = null;
        }
    }

  //loads forms on page load
  ngOnInit() {
        this.getFormDates();
    }

  //Gets form dates from AnalysisService
  getFormDates(){
        this.analysisService.getFormDates(
        ).subscribe(
            form => this.formDatesForms = form,
            error =>  this.errorMessage = <any>error);
    }//end getFormDates

}