import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../FormService/form.service';
import '../rxjs-operators';
import { Observable }     from 'rxjs/Observable';
import { HygIns} from '../classes/HygIns/HygIns';
 
@Component({
    moduleId: module.id,
    selector: 'HygIns',
    templateUrl: 'hygIns.component.html'
})

//This component manages the Hyg Inspection Forms
export class HygInsComponent implements OnInit {
     errorMessage: string;
     hygInsForms: HygIns[];
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
        this.formService.getHygInsForms(
        ).subscribe(
            temp => this.hygInsForms = temp,
            error =>  this.errorMessage = <any>error);
    }//end getForms

    //view form
    gotoDetail(hygIns: HygIns): void {
            let link = ['/hygInsform', hygIns._id];
            this.router.navigate(link);
    }
    
}
