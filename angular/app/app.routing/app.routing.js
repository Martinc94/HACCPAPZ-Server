"use strict";
var router_1 = require('@angular/router');
// page imports
var auth_guard_1 = require('../guards/auth.guard');
var home_component_1 = require('../home.component/home.component');
var about_component_1 = require('../about.component/about.component');
var login_component_1 = require('../login.component/login.component');
var sign_up_component_1 = require('../sign-up.component/sign-up.component');
var settings_component_1 = require('../settings.component/settings.component');
var fitness_component_1 = require('../fitness.component/fitness.component');
var fitness_detail_component_1 = require('../fitness.component/fitness-detail.component/fitness-detail.component');
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'settings', component: settings_component_1.SettingsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'signup', component: sign_up_component_1.SignUpComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'fitnesstowork', component: fitness_component_1.FitnessComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'fitnessform/:_id', component: fitness_detail_component_1.FitnessDetailComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map