import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../FormService/form.service';
import '../rxjs-operators';
import { Observable }     from 'rxjs/Observable';
import { Hothold} from '../classes/Hothold/Hothold';

//This component manages the Hothold Forms
@Component({
    moduleId: module.id,
    selector: 'Hothold',
    templateUrl: 'hothold.component.html'
})

//This component manages the Hothold Forms
export class HotholdComponent implements OnInit {
     errorMessage: string;
     hotholdForms: Hothold[];
     mode = 'Observable';
    
    constructor(private router: Router,
            private formService: FormService){
    }

    //On page load get forms
    ngOnInit() {
        this.getForms();
    }

    //get hothold forms form FormService
    getForms(){
        this.formService.getHotholdForms(
        ).subscribe(
            form => this.hotholdForms = form,
            error =>  this.errorMessage = <any>error);
    }//end getForms

    //view form
    gotoDetail(hothold: Hothold): void {
            let link = ['/hotholdform', hothold._id];
            this.router.navigate(link);
    }
    
}
