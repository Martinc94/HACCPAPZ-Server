import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../FormService/form.service';
import { FoodDelivery} from '../classes/FoodDelivery/FoodDelivery';
import '../rxjs-operators';

import { Observable }     from 'rxjs/Observable';
 
@Component({
    moduleId: module.id,
    selector: 'FoodDelivery',
    templateUrl: 'foodDelivery.component.html'
})
 
export class FoodDeliveryComponent implements OnInit {
     errorMessage: string;
     foodDeliveryForms: FoodDelivery[];
     mode = 'Observable';
    

    constructor(private router: Router,
            private formService: FormService){
    }

    ngOnInit() {
        this.getForms();
    }

    getForms(){
        this.formService.getfoodDeliveryForms(
        ).subscribe(
            temp => this.foodDeliveryForms = temp,
            error =>  this.errorMessage = <any>error);
    }//end getForms

    //view form
   gotoDetail(foodDel: FoodDelivery): void {
            let link = ['/foodDeliveryform', foodDel._id];
            this.router.navigate(link);
    }
    
}
