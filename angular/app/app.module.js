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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
//Pages
var app_component_1 = require('./app.component');
var home_component_1 = require('./home.component/home.component');
var about_component_1 = require('./about.component/about.component');
var login_component_1 = require('./login.component/login.component');
var sign_up_component_1 = require('./sign-up.component/sign-up.component');
var settings_component_1 = require('./settings.component/settings.component');
//Services
var app_routing_1 = require('./app.routing/app.routing');
// used to create fake backend
//import { fakeBackendProvider } from './helpers/fake-backend';
//import { MockBackend, MockConnection } from '@angular/http/testing';
//import { BaseRequestOptions } from '@angular/http';
//handles login and authenticaton
var auth_guard_1 = require('./guards/auth.guard');
var user_service_1 = require('./testservice/user.service');
var login_service_1 = require('./login.component/login.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                about_component_1.AboutComponent,
                login_component_1.LoginComponent,
                sign_up_component_1.SignUpComponent,
                settings_component_1.SettingsComponent,
            ],
            providers: [
                auth_guard_1.AuthGuard,
                login_service_1.AuthenticationService,
                user_service_1.UserService,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map