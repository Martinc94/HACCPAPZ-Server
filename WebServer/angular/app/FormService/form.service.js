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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("../rxjs-operators");
var FormService = (function () {
    function FormService(http) {
        this.http = http;
        this.authHeader = new http_1.Headers();
        //Urls
        this.tempRecUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getTempRecords';
        this.hotholdUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getHothold';
        this.hygieneInsUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getHygieneInspection';
        this.hygieneTrainUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getHygieneTraining';
        this.transportUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getTransport';
        this.fitnessUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getFitnessToWork';
        this.fridgeTempUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getFridgetemp';
        this.foodDeliveryUrl = 'http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getFoodDelivery';
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser.token;
        this.authHeader.append('Authorization', this.token);
    }
    FormService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    FormService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    FormService.prototype.getTempForms = function () {
        return this.http.get(this.tempRecUrl, ({ headers: this.authHeader }))
            .map(this.extractData)
            .catch(this.handleError);
    };
    FormService.prototype.getHotholdForms = function () {
        return this.http.get(this.hotholdUrl, ({ headers: this.authHeader }))
            .map(this.extractData)
            .catch(this.handleError);
    };
    FormService.prototype.getHygInsForms = function () {
        return this.http.get(this.hygieneInsUrl, ({ headers: this.authHeader }))
            .map(this.extractData)
            .catch(this.handleError);
    };
    FormService.prototype.getHygTrainForms = function () {
        return this.http.get(this.hygieneTrainUrl, ({ headers: this.authHeader }))
            .map(this.extractData)
            .catch(this.handleError);
    };
    FormService.prototype.getTransportForms = function () {
        return this.http.get(this.transportUrl, ({ headers: this.authHeader }))
            .map(this.extractData)
            .catch(this.handleError);
    };
    FormService.prototype.getFitnessForms = function () {
        return this.http.get(this.fitnessUrl, ({ headers: this.authHeader }))
            .map(this.extractData)
            .catch(this.handleError);
    };
    FormService.prototype.getFridgeTempForms = function () {
        return this.http.get(this.fridgeTempUrl, ({ headers: this.authHeader }))
            .map(this.extractData)
            .catch(this.handleError);
    };
    FormService.prototype.getfoodDeliveryForms = function () {
        return this.http.get(this.foodDeliveryUrl, ({ headers: this.authHeader }))
            .map(this.extractData)
            .catch(this.handleError);
    };
    return FormService;
}());
FormService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FormService);
exports.FormService = FormService;
//# sourceMappingURL=form.service.js.map