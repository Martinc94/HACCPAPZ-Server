
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Fitness } from '../../classes/fitness/fitness';
import { FormService } from '../../FormService/form.service';;

@Component({
  moduleId: module.id,
  selector: 'my-fitness-detail',
  templateUrl: 'fitness-detail.component.html'
})

//This component manages Fitness forms in detail
export class FitnessDetailComponent implements OnInit {

    @Input()
    form: Fitness;
    errorMessage: string;
    mode = 'Observable';
    
    constructor(
      private formService: FormService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    //On load gets form that matches Url
    ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
        let id = params['_id'];

        this.getFitnessForm(id);

      });//end foreach
    }//end ngOnInit

    //load Form
    getFitnessForm(id:string){
      this.formService.getFitnessForms()
      .subscribe(
        forms => this.form=forms.find(form => form._id == id),
        error =>  this.errorMessage = <any>error)//end subscribe
    }

    //return to last page
    goBack(): void {
      this.location.back();
    }
}