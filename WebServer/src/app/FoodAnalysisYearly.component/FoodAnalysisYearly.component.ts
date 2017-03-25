import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalysisService } from '../AnalysisService/analysis.service';
import { FoodAnalysisYearly} from '../classes/FoodAnalysisYearly/FoodAnalysisYearly';
import { Observable }     from 'rxjs/Observable';
import '../rxjs-operators';
 
@Component({
    moduleId: module.id,
    selector: 'FoodAnalysisYearly',
    templateUrl: 'FoodAnalysisYearly.component.html',
	styleUrls: ['./FoodAnalysisYearly.component.css']
})

//This component manages Food delivery analysis yearly
export class FoodAnalysisYearlyComponent implements OnInit {

    public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
    };

    public barChartLabels:string[] = ['Month '];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData: FoodAnalysisYearly[] = [
        {data: [1], label: '2016'},
        {data: [1], label: '2017'}
    ];

    errorMessage: string;
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
    getAnalysisYearly(url){
        //pass url to analysisService
        this.analysisService.getFoodAnalysisYearlyForms(url)
            .subscribe(
            form => this.barChartData = form,
            error =>  this.errorMessage = <any>error);
    }//end getAnalysis 

    //Builds Url from Html form and passes to getAnalysis method
    submitForm(form: any): void{
        //build url
        var url = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getDeliveryTrendYearly?';

        //add food to url
        if (form.food){
            url+="food="+form.food;
        }
        //add km to url
        if (form.km){
            url+="&km="+form.km;
        }
        //add years to url
        if (form.year1){
            url+="&year1="+form.year1;
        }
        if (form.year2){
            url+="&year2="+form.year2;
        }
        if (form.month){
            url+="&month="+form.month;
        }
        
        
        //add lat long to url
        url+="&lat="+ this.lat;
        url+="&lng="+ this.lng;

        //pass url as method param
        this.getAnalysisYearly(url);

        //go to results
        this.goToBottom(10);  
    }

    goToResults(timeout: number): void {
      // wait a selected amount of time before scrolling to bottom of page
      window.setTimeout( function () { document.getElementById('results').scrollIntoView(); }, timeout );
    } // goToResults()

    goToBottom(timeout: number): void {
      // wait a selected amount of time before scrolling to bottom of page
      window.setTimeout( function () { document.getElementById('bottom').scrollIntoView(); }, timeout );
    } // goToBottom()

}
