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
var form_service_1 = require("../FormService/form.service");
require("../rxjs-operators");
var TransportComponent = (function () {
    function TransportComponent(router, formService) {
        this.router = router;
        this.formService = formService;
        this.mode = 'Observable';
    }
    TransportComponent.prototype.ngOnInit = function () {
        this.getForms();
    };
    TransportComponent.prototype.getForms = function () {
        var _this = this;
        this.formService.getTransportForms().subscribe(function (temp) { return _this.forms = temp; }, function (error) { return _this.errorMessage = error; });
    }; //end getTempForms
    //view form
    TransportComponent.prototype.gotoDetail = function (transport) {
        var link = ['/transportform', transport._id];
        this.router.navigate(link);
    };
    return TransportComponent;
}());
TransportComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'transport',
        templateUrl: 'transport.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        form_service_1.FormService])
], TransportComponent);
exports.TransportComponent = TransportComponent;
//# sourceMappingURL=transport.component.js.map