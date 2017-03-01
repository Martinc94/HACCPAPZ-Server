
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FormService } from '../../FormService/form.service';
import { Hothold } from '../../classes/Hothold/Hothold';

@Component({
  moduleId: module.id,
  selector: 'my-hothold-detail',
  templateUrl: 'hothold-detail.component.html'
})

//This component manages the Hothold Forms in detail
export class HotholdDetailComponent implements OnInit {

    @Input()
    form: Hothold;
    errorMessage: string;
    mode = 'Observable';
    
    constructor(
      private formService: FormService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    //On page load calls form
    ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
        let id = params['_id'];

        this.getForm(id);

      });//end foreach
    }//end ngOnInit

    //gets form from FormService
    getForm(id:string){
      this.formService.getHotholdForms()
      .subscribe(
        forms => this.form=forms.find(form => form._id == id),
        error =>  this.errorMessage = <any>error)//end subscribe
    }

    goBack(): void {
      this.location.back();
    }
}