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
var fridgeTemp_service_1 = require('../fridgeTemp.component/fridgeTemp.service');
require('../rxjs-operators');
var FridgeTempComponent = (function () {
    function FridgeTempComponent(router, tempService) {
        this.router = router;
        this.tempService = tempService;
        this.mode = 'Observable';
    }
    FridgeTempComponent.prototype.ngOnInit = function () {
        this.getTempForms();
    };
    FridgeTempComponent.prototype.getTempForms = function () {
        var _this = this;
        this.tempService.getTempForms().subscribe(function (temp) { return _this.tempForms = temp; }, function (error) { return _this.errorMessage = error; });
    }; //end getTempForms
    FridgeTempComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'fridgeTemp',
            templateUrl: 'fridgeTemp.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, fridgeTemp_service_1.TempService])
    ], FridgeTempComponent);
    return FridgeTempComponent;
}());
exports.FridgeTempComponent = FridgeTempComponent;
//# sourceMappingURL=fridgeTemp.component.js.map