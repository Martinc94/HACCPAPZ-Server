
// System imports
import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

// page imports
import { AuthGuard }                from '../guards/auth.guard';
import { HomeComponent }            from '../home.component/home.component';
import { AboutComponent }           from '../about.component/about.component';
import { LoginComponent }           from '../login.component/login.component';
import { SignUpComponent }          from '../sign-up.component/sign-up.component';
import { SettingsComponent }        from '../settings.component/settings.component';
import { FitnessComponent }        from '../fitness.component/fitness.component';



const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent},
    { path: 'about', component: AboutComponent },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard] },
    { path: 'fitnesstowork', component: FitnessComponent, canActivate: [AuthGuard] },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    
    
    
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);