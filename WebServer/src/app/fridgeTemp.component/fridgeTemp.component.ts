import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../FormService/form.service';
import { Temp} from '../classes/Temp/temp';
import '../rxjs-operators';
import { Observable }     from 'rxjs/Observable';
 
@Component({
    moduleId: module.id,
    selector: 'fridgeTemp',
    templateUrl: 'fridgeTemp.component.html'
})

//This component manages the Fridge Temp Forms
export class FridgeTempComponent implements OnInit {
     errorMessage: string;
     tempForms: Temp[];
     mode = 'Observable';
    
    constructor(private router: Router,
            private formService: FormService){
    }

    //gets form on Load
    ngOnInit() {
        this.getTempForms();
    }

    //Gets form from FormService
    getTempForms(){
        this.formService.getFridgeTempForms(
        ).subscribe(
            temp => this.tempForms = temp,
            error =>  this.errorMessage = <any>error);
    }//end getTempForms
  
}
