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
var HygTrain_1 = require("../../classes/HygTrain/HygTrain");
var form_service_1 = require("../../FormService/form.service");
var HygTraDetailComponent = (function () {
    function HygTraDetailComponent(formService, route, location) {
        this.formService = formService;
        this.route = route;
        this.location = location;
        this.mode = 'Observable';
    }
    HygTraDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['_id'];
            _this.getForm(id);
        }); //end foreach
    }; //end ngOnInit
    HygTraDetailComponent.prototype.getForm = function (id) {
        var _this = this;
        this.formService.getHygTrainForms()
            .subscribe(function (forms) { return _this.form = forms.find(function (form) { return form._id == id; }); }, function (error) { return _this.errorMessage = error; }); //end subscribe
    };
    HygTraDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    return HygTraDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", HygTrain_1.HygTrain)
], HygTraDetailComponent.prototype, "form", void 0);
HygTraDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-hygTra-detail',
        templateUrl: 'hygTra-detail.component.html'
    }),
    __metadata("design:paramtypes", [form_service_1.FormService,
        router_1.ActivatedRoute,
        common_1.Location])
], HygTraDetailComponent);
exports.HygTraDetailComponent = HygTraDetailComponent;
//# sourceMappingURL=hygTra-detail.component.js.map