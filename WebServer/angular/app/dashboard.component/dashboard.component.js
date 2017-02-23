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
var analysis_service_1 = require("../AnalysisService/analysis.service");
require("../rxjs-operators");
var DashboardComponent = (function () {
    function DashboardComponent(router, analysisService) {
        this.router = router;
        this.analysisService = analysisService;
        this.title = "User Dashboard";
        this.mode = 'Observable';
        try {
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.userName = currentUser.username;
        }
        catch (error) {
            this.userName = null;
        }
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getFormDates();
    };
    DashboardComponent.prototype.getFormDates = function () {
        var _this = this;
        this.analysisService.getFormDates().subscribe(function (form) { return _this.formDatesForms = form; }, function (error) { return _this.errorMessage = error; });
    }; //end getFitnessForms
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'dashboard-page',
        templateUrl: 'dashboard.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        analysis_service_1.AnalysisService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map