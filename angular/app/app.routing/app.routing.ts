
// System imports
import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

// page imports
import { HomeComponent }            from '../home.component/home.component';
import { AboutComponent }           from '../about.component/about.component';
import { LoginComponent }           from '../login.component/login.component';
import { SignUpComponent }          from '../sign-up.component/sign-up.component';
import { SettingsComponent }        from '../settings.component/settings.component';
import { AuthGuard }                from '../guards/auth.guard';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    
    
    /*{
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },*/
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);