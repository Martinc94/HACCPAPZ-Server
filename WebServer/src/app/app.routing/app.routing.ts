
// System imports
import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

// page imports
import { AuthGuard }                from '../guards/auth.guard';
import { AdminGuard }               from '../guards/admin.guard';
import { HomeComponent }            from '../home.component/home.component';
import { AboutComponent }           from '../about.component/about.component';
import { LoginComponent }           from '../login.component/login.component';
import { SettingsComponent }        from '../settings.component/settings.component';
import { FitnessComponent }         from '../fitness.component/fitness.component';
import { FitnessDetailComponent }   from '../fitness.component/fitness-detail.component/fitness-detail.component';
import { FridgeTempComponent }      from '../fridgeTemp.component/fridgeTemp.component';
import { TempRecComponent }         from '../tempRecords.component/tempRec.component';
import { TempRecDetailComponent }   from '../tempRecords.component/tempRec-detail.component/tempRec-detail.component';
import { HotholdComponent }         from '../hothold.component/hothold.component';
import { HotholdDetailComponent }   from '../hothold.component/hothold-detail.component/hothold-detail.component';
import { HygInsComponent }         from '../hygIns.component/hygIns.component';
import { HygInsDetailComponent }   from '../hygIns.component/hygIns-detail.component/hygIns-detail.component';
import { hygTraComponent }         from '../hygTra.component/hygTra.component';
import { HygTraDetailComponent }   from '../hygTra.component/hygTra-detail.component/hygTra-detail.component';
import { TransportComponent }         from '../transport.component/transport.component';
import { TransportDetailComponent }   from '../transport.component/transport-detail.component/transport-detail.component';
import { DashboardComponent }          from '../dashboard.component/dashboard.component';
import { FoodDeliveryComponent }       from '../foodDelivery.component/foodDelivery.component';
import { FoodDeliveryDetailComponent }       from '../foodDelivery.component/foodDelivery-detail.component/foodDelivery-detail.component';
import { FoodAnalysisComponent }         from '../FoodAnalysis.component/FoodAnalysis.component';

//Links urls to their component
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent},
    { path: 'about', component: AboutComponent },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'fitnesstowork', component: FitnessComponent, canActivate: [AuthGuard] },
    { path: 'fitnessform/:_id',component: FitnessDetailComponent},
    { path: 'fridgetemp', component: FridgeTempComponent, canActivate: [AuthGuard] },
    { path: 'temprecords', component: TempRecComponent, canActivate: [AuthGuard] },
    { path: 'temprecform/:_id',component: TempRecDetailComponent, canActivate: [AuthGuard] },
    { path: 'hothold', component: HotholdComponent, canActivate: [AuthGuard] },
    { path: 'hotholdform/:_id',component: HotholdDetailComponent, canActivate: [AuthGuard] },
    { path: 'hygieneIns', component: HygInsComponent, canActivate: [AuthGuard] },
    { path: 'hygInsform/:_id',component: HygInsDetailComponent, canActivate: [AuthGuard] },
    { path: 'hygieneTraining', component: hygTraComponent, canActivate: [AuthGuard] },
    { path: 'hygtraform/:_id',component: HygTraDetailComponent, canActivate: [AuthGuard] },
    { path: 'transport', component: TransportComponent, canActivate: [AuthGuard] },
    { path: 'transportform/:_id',component: TransportDetailComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'foodDelivery', component: FoodDeliveryComponent, canActivate: [AuthGuard] },
    { path: 'foodDeliveryform/:_id',component: FoodDeliveryDetailComponent, canActivate: [AuthGuard] },
    { path: 'foodTrend', component: FoodAnalysisComponent,canActivate: [AdminGuard]},
    
    // otherwise redirect to home
    { path: '**', redirectTo: '' }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);