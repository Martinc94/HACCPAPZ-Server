import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FitnessService } from '../fitness.component/fitness.service';
import { Fitness} from '../classes/Fitness/fitness';
import '../rxjs-operators';

import { Observable }     from 'rxjs/Observable';
 
@Component({
    moduleId: module.id,
    selector: 'fitness',
    templateUrl: 'fitness.component.html'
})
 
export class FitnessComponent implements OnInit {
     errorMessage: string;
     fitnessForms: Fitness[];
     mode = 'Observable';
    

    constructor(private router: Router,
            private fitnessService: FitnessService){
    }

    ngOnInit() {
        this.getFitnessForms();
    }

    getFitnessForms(){
        this.fitnessService.getFitnessForms(
        ).subscribe(
            fitness => this.fitnessForms = fitness,
            error =>  this.errorMessage = <any>error);
    }//end getFitnessForms



    //view form
    gotoDetail(fitness: Fitness): void {
            let link = ['/fitnessform', fitness._id];
            this.router.navigate(link);
    }
    
}
