import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalysisService } from '../AnalysisService/analysis.service';
import { FoodAnalysis} from '../classes/FoodAnalysis/foodAnalysis';
import { Observable }     from 'rxjs/Observable';
import '../rxjs-operators';
 
@Component({
    moduleId: module.id,
    selector: 'foodAnalysis',
    templateUrl: 'foodAnalysis.component.html',
	styleUrls: ['./FoodAnalysis.component.css']
})

//This component manages Food delivery analysis
export class FoodAnalysisComponent implements OnInit {
     errorMessage: string;
     foodAnalysisForms: FoodAnalysis[];
     mode = 'Observable';

    constructor(private router: Router,
            private analysisService: AnalysisService){                 
    }

    lng: number=53.4239331 ;
    lat: number=-7.940689799999973;

    //stores Lat and Long
    setPosition(position){
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
    }
	
	updateLocation(pos) {	
	    this.lat = pos.coords.lat;
		this.lng = pos.coords.lng;
	}

    markerClick(e) {	
	    console.log(e);
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
        url+="&lat="+ this.lat;
        url+="&lng="+ this.lng;

        //pass url as method param
        this.getAnalysis(url);

        //go to results
        this.goToBottom(10);
    }

    goToBottom(timeout: number): void {
      // wait a selected amount of time before scrolling to bottom of page
      window.setTimeout( function () { document.getElementById('bottom').scrollIntoView(); }, timeout );
    } // goToBottom()

}
