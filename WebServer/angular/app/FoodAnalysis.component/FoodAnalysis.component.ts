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

     //private lat: any;
     //private lng: any;

    constructor(private router: Router,
            private analysisService: AnalysisService){
    }

    ngOnInit() {
        this.getAnalysis();

        var lat;
        var lng;
        
        if(!!navigator.geolocation) {
            //console.log("Support");
        } else {
            console.log("No support");// No support
        }
    }

    getAnalysis(){
        this.analysisService.getFoodAnalysisForms(
        ).subscribe(
            form => this.foodAnalysisForms = form,
            error =>  this.errorMessage = <any>error);
    }//end getAnalysis 

    /*getGeoLocation(){
        var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);

            //this.lat=crd.latitude;
            //this.lng=crd.longitude;

        };

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
        

    }//end getGeoLocation */

}
