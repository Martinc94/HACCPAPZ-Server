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

//This component manages Food delivery analysis
export class FoodAnalysisComponent implements OnInit {
     errorMessage: string;
     foodAnalysisForms: FoodAnalysis[];
     mode = 'Observable';

    constructor(private router: Router,
            private analysisService: AnalysisService){
    }

    lattitude = {};
    longitude = {};

    //stores Lat and Long
    setPosition(position){
      this.lattitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    }
    
    //on load check for navigator and get Geolocation if possible
    ngOnInit() {
        if(!!navigator.geolocation) {
            //gets GetLocation
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        } else {
            console.log("No support");// No support
        }
    }

    //Passes custom url to Analysis Service
    getAnalysis(url){
        //pass url to analysisService
        this.analysisService.getFoodAnalysisForms(url)
            .subscribe(
            form => this.foodAnalysisForms = form,
            error =>  this.errorMessage = <any>error);
    }//end getAnalysis 

    //Builds Url from Html form and passes to getAnalysis method
    submitForm(form: any): void{
        //build url
        var url = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getDeliveryTrend?';

        //add food to url
        if (form.food){
            url+="food="+form.food;
        }
        //add months to url
        if (form.months){
            url+="&months="+form.months;
        }
        //add km to url
        if (form.km){
            url+="&km="+form.km;
        }
        
        //add lat long to url
        url+="&lat="+ this.lattitude;
        url+="&lng="+ this.longitude;

        //pass url as method param
        this.getAnalysis(url);
    }

}
