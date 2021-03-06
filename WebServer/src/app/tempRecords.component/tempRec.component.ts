import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../FormService/form.service';
import { TempRec} from '../classes/TempRec/TempRec';
import '../rxjs-operators';

import { Observable }     from 'rxjs/Observable';
 
@Component({
    moduleId: module.id,
    selector: 'TempRec',
    templateUrl: 'tempRec.component.html'
})

//This component manages the Temp Records
export class TempRecComponent implements OnInit {
     errorMessage: string;
     tempForms: TempRec[];
     mode = 'Observable';

    constructor(private router: Router,
            private formService: FormService){
    }

    //Gets forms on page load
    ngOnInit() {
        this.getForms();
    }

    //gets forms from FormService
    getForms(){
        this.formService.getTempForms(
        ).subscribe(
            temp => this.tempForms = temp,
            error =>  this.errorMessage = <any>error);
    }//end getTempForms

    //view form
    gotoDetail(tempRec: TempRec): void {
            let link = ['/temprecform', tempRec._id];
            this.router.navigate(link);
    }
    
}
