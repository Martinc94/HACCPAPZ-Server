import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FitnessService } from '../fitness.component/fitness.service';
 
@Component({
    moduleId: module.id,
    selector: 'fitness',
    templateUrl: 'fitness.component.html'
})
 
export class FitnessComponent {
getData: String;

constructor(private router: Router,
        private fitnessService: FitnessService){

}

ngOnInit() {
        this.getFitForms();
    }

getFitForms(){
    this.fitnessService.getFitnessForms()
        .subscribe(
            data  => this.getData = JSON.stringify(data),
            error => alert("Error getting forms"),
            () => console.log("Finished")
        );   
}
    
}
