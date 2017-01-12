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
 
export class FridgeTempComponent implements OnInit {
     errorMessage: string;
     tempForms: Temp[];
     mode = 'Observable';
    

    constructor(private router: Router,
            private formService: FormService){
    }

    ngOnInit() {
        this.getTempForms();
    }

    getTempForms(){
        this.formService.getFridgeTempForms(
        ).subscribe(
            temp => this.tempForms = temp,
            error =>  this.errorMessage = <any>error);
    }//end getTempForms



    /*//view form
    gotoDetail(temp: Temp): void {
            let link = ['/tempform', temp._id];
            this.router.navigate(link);
    }*/
    
}
