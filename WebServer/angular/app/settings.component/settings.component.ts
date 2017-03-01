
// System imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../SettingsService/Settings.service';
import '../rxjs-operators';
import { Observable }     from 'rxjs/Observable';
//page imports
import {Food} from '../classes/Settings/Food/Food';
import {Supplier} from '../classes/Settings/Supplier/Supplier';
import {Fridge} from '../classes/Settings/Fridge/Fridge';

@Component({
  moduleId: module.id,
  selector: 'settings-page',
  templateUrl: 'settings.component.html'
})

//This component manages the users settings
export class SettingsComponent implements OnInit {
    errorMessage: string;
    mode = 'Observable';
    foodForms: Food[];
    supplierForms: Supplier[];
    fridgeForms: Fridge[];

    constructor(private router: Router,
            private settingsService: SettingsService){
    }

    //loads settings on page load
    ngOnInit() {
        this.getFoodForms();
        this.getSupplierForms();
        this.getFridgeForms();
    }

    //Methods for getting settings

    getFoodForms(){
        this.settingsService.getFoodSettings(
        ).subscribe(
            food => this.foodForms = food,
            error =>  this.errorMessage = <any>error);
    }//end getFoodForms

    getSupplierForms(){
        this.settingsService.getSupplierSettings(
        ).subscribe(
            food => this.supplierForms = food,
            error =>  this.errorMessage = <any>error);
    }//end getSupplierForms

    getFridgeForms(){
        this.settingsService.getFridgeSettings(
        ).subscribe(
            food => this.fridgeForms = food,
            error =>  this.errorMessage = <any>error);
    }//end getFridgeForms
}