"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var fitness_service_1 = require('../fitness.component/fitness.service');
var FitnessComponent = (function () {
    function FitnessComponent(router, fitnessService) {
        this.router = router;
        this.fitnessService = fitnessService;
    }
    FitnessComponent.prototype.ngOnInit = function () {
        this.getFitForms();
    };
    FitnessComponent.prototype.getFitForms = function () {
        var _this = this;
        this.fitnessService.getFitnessForms()
            .subscribe(function (data) { return _this.getData = JSON.stringify(data); }, function (error) { return alert("Error getting forms"); }, function () { return console.log("Finished"); });
    };
    FitnessComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'fitness',
            templateUrl: 'fitness.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, fitness_service_1.FitnessService])
    ], FitnessComponent);
    return FitnessComponent;
}());
exports.FitnessComponent = FitnessComponent;
//# sourceMappingURL=fitness.component.js.map