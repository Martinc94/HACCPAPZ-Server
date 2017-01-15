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
// System imports
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Settings_service_1 = require("../SettingsService/Settings.service");
require("../rxjs-operators");
var SettingsComponent = (function () {
    function SettingsComponent(router, settingsService) {
        this.router = router;
        this.settingsService = settingsService;
        this.mode = 'Observable';
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.getFoodForms();
        this.getSupplierForms();
        this.getFridgeForms();
    };
    SettingsComponent.prototype.getFoodForms = function () {
        var _this = this;
        this.settingsService.getFoodSettings().subscribe(function (food) { return _this.foodForms = food; }, function (error) { return _this.errorMessage = error; });
    }; //end getFoodForms
    SettingsComponent.prototype.getSupplierForms = function () {
        var _this = this;
        this.settingsService.getSupplierSettings().subscribe(function (food) { return _this.supplierForms = food; }, function (error) { return _this.errorMessage = error; });
    }; //end getSupplierForms
    SettingsComponent.prototype.getFridgeForms = function () {
        var _this = this;
        this.settingsService.getFridgeSettings().subscribe(function (food) { return _this.fridgeForms = food; }, function (error) { return _this.errorMessage = error; });
    }; //end getFridgeForms
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'settings-page',
        templateUrl: 'settings.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        Settings_service_1.SettingsService])
], SettingsComponent);
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map