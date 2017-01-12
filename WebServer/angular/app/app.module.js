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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
//Pages
var app_component_1 = require("./app.component");
var home_component_1 = require("./home.component/home.component");
var about_component_1 = require("./about.component/about.component");
var login_component_1 = require("./login.component/login.component");
var sign_up_component_1 = require("./sign-up.component/sign-up.component");
var settings_component_1 = require("./settings.component/settings.component");
var fitness_component_1 = require("./fitness.component/fitness.component");
var fitness_detail_component_1 = require("./fitness.component/fitness-detail.component/fitness-detail.component");
var fridgeTemp_component_1 = require("./fridgeTemp.component/fridgeTemp.component");
var tempRec_component_1 = require("./tempRecords.component/tempRec.component");
var tempRec_detail_component_1 = require("./tempRecords.component/tempRec-detail.component/tempRec-detail.component");
var hothold_component_1 = require("./hothold.component/hothold.component");
var hothold_detail_component_1 = require("./hothold.component/hothold-detail.component/hothold-detail.component");
var hygIns_component_1 = require("./hygIns.component/hygIns.component");
var hygIns_detail_component_1 = require("./hygIns.component/hygIns-detail.component/hygIns-detail.component");
var hygTra_component_1 = require("./hygTra.component/hygTra.component");
var hygTra_detail_component_1 = require("./hygTra.component/hygTra-detail.component/hygTra-detail.component");
var transport_component_1 = require("./transport.component/transport.component");
var transport_detail_component_1 = require("./transport.component/transport-detail.component/transport-detail.component");
var dashboard_component_1 = require("./dashboard.component/dashboard.component");
//Services
//////////////////////////////////////////////////////////////
//Handles Routing
var app_routing_1 = require("./app.routing/app.routing");
//login and authenticaton services
var auth_guard_1 = require("./guards/auth.guard");
var user_service_1 = require("./testservice/user.service");
var login_service_1 = require("./login.component/login.service");
//form service
var form_service_1 = require("./FormService/form.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
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
            fitness_component_1.FitnessComponent,
            fitness_detail_component_1.FitnessDetailComponent,
            fridgeTemp_component_1.FridgeTempComponent,
            tempRec_component_1.TempRecComponent,
            tempRec_detail_component_1.TempRecDetailComponent,
            hothold_component_1.HotholdComponent,
            hothold_detail_component_1.HotholdDetailComponent,
            hygIns_component_1.HygInsComponent,
            hygIns_detail_component_1.HygInsDetailComponent,
            hygTra_component_1.hygTraComponent,
            hygTra_detail_component_1.HygTraDetailComponent,
            transport_component_1.TransportComponent,
            transport_detail_component_1.TransportDetailComponent,
            dashboard_component_1.DashboardComponent,
        ],
        providers: [
            auth_guard_1.AuthGuard,
            login_service_1.AuthenticationService,
            user_service_1.UserService,
            form_service_1.FormService,
        ],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map