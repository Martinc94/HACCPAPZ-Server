
// System imports
import { Component,OnInit}    from '@angular/core';
import { Router }       from '@angular/router';

import { AnalysisService } from '../AnalysisService/analysis.service';
import {FormDates} from '../classes/FormDates/FormDates';
import '../rxjs-operators';
import { Observable }     from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'dashboard-page',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
   errorMessage: string;
    title = "User Dashboard";
    public userName: string;
    formDatesForms: FormDates[];
     mode = 'Observable';

  constructor(private router: Router,
            private analysisService: AnalysisService) {
    try {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.userName = currentUser.username;
      
    } catch (error) {
      this.userName = null;
    }
  }

  ngOnInit() {
        this.getFormDates();
    }

 getFormDates(){
        this.analysisService.getFormDates(
        ).subscribe(
            form => this.formDatesForms = form,
            error =>  this.errorMessage = <any>error);
    }//end getFitnessForms

}