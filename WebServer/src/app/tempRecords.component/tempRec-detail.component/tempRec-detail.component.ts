
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { TempRec } from '../../classes/TempRec/TempRec';
import { FormService } from '../../FormService/form.service';

@Component({
  moduleId: module.id,
  selector: 'my-tempRec-detail',
  templateUrl: 'tempRec-detail.component.html'
})

//This component manages the Temp Records in detail
export class TempRecDetailComponent implements OnInit {

    @Input()
    form: TempRec;
    errorMessage: string;
    mode = 'Observable';
    
    constructor(
      private formService: FormService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    //On page load get form fro url param
    ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
        let id = params['_id'];

        this.getForm(id);

      });//end foreach
    }//end ngOnInit

    //get url from FormService by Id
    getForm(id:string){
      this.formService.getTempForms()
      .subscribe(
        forms => this.form=forms.find(form => form._id == id),
        error =>  this.errorMessage = <any>error)//end subscribe
    }

    goBack(): void {
      this.location.back();
    }
}