import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../FormService/form.service';
import { Transport} from '../classes/Transport/Transport';
import '../rxjs-operators';

import { Observable }     from 'rxjs/Observable';
 
@Component({
    moduleId: module.id,
    selector: 'transport',
    templateUrl: 'transport.component.html'
})
 
export class TransportComponent implements OnInit {
     errorMessage: string;
     forms: Transport[];
     mode = 'Observable';
    

    constructor(private router: Router,
            private formService: FormService){
    }

    ngOnInit() {
        this.getForms();
    }

    getForms(){
        this.formService.getTransportForms(
        ).subscribe(
            temp => this.forms = temp,
            error =>  this.errorMessage = <any>error);
    }//end getTempForms



    //view form
    gotoDetail(transport: Transport): void {
            let link = ['/transportform', transport._id];
            this.router.navigate(link);
    }
    
}
