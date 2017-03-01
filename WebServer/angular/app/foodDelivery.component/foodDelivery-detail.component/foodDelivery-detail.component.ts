
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FoodDelivery } from '../../classes/FoodDelivery/FoodDelivery';
import { FormService } from '../../FormService/form.service';

@Component({
  moduleId: module.id,
  selector: 'my-foodDelivery-detail',
  templateUrl: 'foodDelivery-detail.component.html'
})

//This component manages the Food Delivery forms in detail
export class FoodDeliveryDetailComponent implements OnInit {

    @Input()
    form: FoodDelivery;
    errorMessage: string;
    mode = 'Observable';
    
    constructor(
      private formService: FormService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    //On load gets form Id from url
    ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
        let id = params['_id'];

        this.getForm(id);

      });//end foreach
    }//end ngOnInit

    //get form from FormService
    getForm(id:string){
      this.formService.getfoodDeliveryForms()
      .subscribe(
        forms => this.form=forms.find(form => form._id == id),
        error =>  this.errorMessage = <any>error)//end subscribe
    }

    goBack(): void {
      this.location.back();
    }
}