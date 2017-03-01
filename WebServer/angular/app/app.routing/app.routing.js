"use strict";
var router_1 = require("@angular/router");
// page imports
var auth_guard_1 = require("../guards/auth.guard");
var home_component_1 = require("../home.component/home.component");
var about_component_1 = require("../about.component/about.component");
var login_component_1 = require("../login.component/login.component");
var settings_component_1 = require("../settings.component/settings.component");
var fitness_component_1 = require("../fitness.component/fitness.component");
var fitness_detail_component_1 = require("../fitness.component/fitness-detail.component/fitness-detail.component");
var fridgeTemp_component_1 = require("../fridgeTemp.component/fridgeTemp.component");
var tempRec_component_1 = require("../tempRecords.component/tempRec.component");
var tempRec_detail_component_1 = require("../tempRecords.component/tempRec-detail.component/tempRec-detail.component");
var hothold_component_1 = require("../hothold.component/hothold.component");
var hothold_detail_component_1 = require("../hothold.component/hothold-detail.component/hothold-detail.component");
var hygIns_component_1 = require("../hygIns.component/hygIns.component");
var hygIns_detail_component_1 = require("../hygIns.component/hygIns-detail.component/hygIns-detail.component");
var hygTra_component_1 = require("../hygTra.component/hygTra.component");
var hygTra_detail_component_1 = require("../hygTra.component/hygTra-detail.component/hygTra-detail.component");
var transport_component_1 = require("../transport.component/transport.component");
var transport_detail_component_1 = require("../transport.component/transport-detail.component/transport-detail.component");
var dashboard_component_1 = require("../dashboard.component/dashboard.component");
var foodDelivery_component_1 = require("../foodDelivery.component/foodDelivery.component");
var foodDelivery_detail_component_1 = require("../foodDelivery.component/foodDelivery-detail.component/foodDelivery-detail.component");
var FoodAnalysis_component_1 = require("../FoodAnalysis.component/FoodAnalysis.component");
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'settings', component: settings_component_1.SettingsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'fitnesstowork', component: fitness_component_1.FitnessComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'fitnessform/:_id', component: fitness_detail_component_1.FitnessDetailComponent },
    { path: 'fridgetemp', component: fridgeTemp_component_1.FridgeTempComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'temprecords', component: tempRec_component_1.TempRecComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'temprecform/:_id', component: tempRec_detail_component_1.TempRecDetailComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'hothold', component: hothold_component_1.HotholdComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'hotholdform/:_id', component: hothold_detail_component_1.HotholdDetailComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'hygieneIns', component: hygIns_component_1.HygInsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'hygInsform/:_id', component: hygIns_detail_component_1.HygInsDetailComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'hygieneTraining', component: hygTra_component_1.hygTraComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'hygtraform/:_id', component: hygTra_detail_component_1.HygTraDetailComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'transport', component: transport_component_1.TransportComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'transportform/:_id', component: transport_detail_component_1.TransportDetailComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'foodDelivery', component: foodDelivery_component_1.FoodDeliveryComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'foodDeliveryform/:_id', component: foodDelivery_detail_component_1.FoodDeliveryDetailComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'foodTrend', component: FoodAnalysis_component_1.FoodAnalysisComponent, canActivate: [auth_guard_1.AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map