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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var TempRec_1 = require("../../classes/TempRec/TempRec");
var form_service_1 = require("../../FormService/form.service");
var TempRecDetailComponent = (function () {
    function TempRecDetailComponent(formService, route, location) {
        this.formService = formService;
        this.route = route;
        this.location = location;
        this.mode = 'Observable';
    }
    TempRecDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['_id'];
            _this.getForm(id);
        }); //end foreach
    }; //end ngOnInit
    TempRecDetailComponent.prototype.getForm = function (id) {
        var _this = this;
        this.formService.getTempForms()
            .subscribe(function (forms) { return _this.form = forms.find(function (form) { return form._id == id; }); }, function (error) { return _this.errorMessage = error; }); //end subscribe
    };
    TempRecDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    return TempRecDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", TempRec_1.TempRec)
], TempRecDetailComponent.prototype, "form", void 0);
TempRecDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-tempRec-detail',
        templateUrl: 'tempRec-detail.component.html'
    }),
    __metadata("design:paramtypes", [form_service_1.FormService,
        router_1.ActivatedRoute,
        common_1.Location])
], TempRecDetailComponent);
exports.TempRecDetailComponent = TempRecDetailComponent;
//# sourceMappingURL=tempRec-detail.component.js.map