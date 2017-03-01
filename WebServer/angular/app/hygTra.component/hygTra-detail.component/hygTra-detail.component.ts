
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HygTrain } from '../../classes/HygTrain/HygTrain';
import { FormService } from '../../FormService/form.service';

@Component({
  moduleId: module.id,
  selector: 'my-hygTra-detail',
  templateUrl: 'hygTra-detail.component.html'
})

//This component manages the Hyg Tra Forms in detail
export class HygTraDetailComponent implements OnInit {

    @Input()
    form: HygTrain;
    errorMessage: string;
    mode = 'Observable';
    
    constructor(
      private formService: FormService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    //get form from url Params
    ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
        let id = params['_id'];

        this.getForm(id);

      });//end foreach
    }//end ngOnInit

    //gets form from FormService by id
    getForm(id:string){
      this.formService.getHygTrainForms()
      .subscribe(
        forms => this.form=forms.find(form => form._id == id),
        error =>  this.errorMessage = <any>error)//end subscribe
    }

    goBack(): void {
      this.location.back();
    }
}