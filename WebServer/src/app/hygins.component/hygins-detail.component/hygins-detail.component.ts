
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HygIns } from '../../classes/HygIns/HygIns';
import { FormService } from '../../FormService/form.service';

@Component({
  moduleId: module.id,
  selector: 'my-hygIns-detail',
  templateUrl: 'hygIns-detail.component.html'
})

//This component manages the Hyg Ins Forms in detail
export class HygInsDetailComponent implements OnInit {

    @Input()
    form: HygIns;
    errorMessage: string;
    mode = 'Observable';
    
    constructor(
      private formService: FormService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    //on page load get form from url param
    ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
        let id = params['_id'];

        this.getForm(id);

      });//end foreach
    }//end ngOnInit

    //get form from FormService by Id
    getForm(id:string){
      this.formService.getHygInsForms()
      .subscribe(
        forms => this.form=forms.find(form => form._id == id),
        error =>  this.errorMessage = <any>error)//end subscribe
    }

    goBack(): void {
      this.location.back();
    }
}