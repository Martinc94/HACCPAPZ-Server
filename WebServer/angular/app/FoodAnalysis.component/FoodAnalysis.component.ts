import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalysisService } from '../AnalysisService/analysis.service';
import { FoodAnalysis} from '../classes/FoodAnalysis/foodAnalysis';
import { Observable }     from 'rxjs/Observable';
import '../rxjs-operators';
 
@Component({
    moduleId: module.id,
    selector: 'foodAnalysis',
    templateUrl: 'foodAnalysis.component.html'
})
 
export class FoodAnalysisComponent implements OnInit {
     errorMessage: string;
     foodAnalysisForms: FoodAnalysis[];
     mode = 'Observable';

    constructor(private router: Router,
            private analysisService: AnalysisService){
    }

    ngOnInit() {
        this.getAnalysis();
    }

    getAnalysis(){
        this.analysisService.getFoodAnalysisForms(
        ).subscribe(
            form => this.foodAnalysisForms = form,
            error =>  this.errorMessage = <any>error);
    }//end getAnalysis 
}
