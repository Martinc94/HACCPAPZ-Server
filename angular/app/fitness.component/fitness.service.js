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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var FitnessService = (function () {
    function FitnessService(http) {
        this.http = http;
        this.authHeader = new http_1.Headers();
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser.token;
        this.authHeader.append('Authorization', this.token);
    }
    FitnessService.prototype.getFitnessForms = function () {
        return this.http.get('http://haccpapz.northeurope.cloudapp.azure.com:8080/api/getFitnessToWork', ({ headers: this.authHeader }))
            .map(function (res) { return res.json(); });
    };
    FitnessService.prototype.getdate = function () {
        return this.http.get('http://date.jsontest.com/')
            .map(function (res) { return res.json(); });
    };
    FitnessService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FitnessService);
    return FitnessService;
}());
exports.FitnessService = FitnessService;
//# sourceMappingURL=fitness.service.js.map