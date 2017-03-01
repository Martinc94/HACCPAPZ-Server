import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../FormService/form.service';
import { HygTrain} from '../classes/hygTrain/hygTrain';
import '../rxjs-operators';

import { Observable }     from 'rxjs/Observable';
 
@Component({
    moduleId: module.id,
    selector: 'hygTra',
    templateUrl: 'hygTra.component.html'
})

//This component manages the Hyg Training Forms
export class hygTraComponent implements OnInit {
     errorMessage: string;
     forms: HygTrain[];
     mode = 'Observable';
    

    constructor(private router: Router,
            private formService: FormService){
    }

    //On page load get forms
    ngOnInit() {
        this.getForms();
    }

    //gets forms from FormService
    getForms(){
        this.formService.getHygTrainForms(
        ).subscribe(
            temp => this.forms = temp,
            error =>  this.errorMessage = <any>error);
    }//end getTempForms

    //view form
    gotoDetail(hygTrain: HygTrain): void {
            let link = ['/hygtraform', hygTrain._id];
            this.router.navigate(link);
    }
    
}
