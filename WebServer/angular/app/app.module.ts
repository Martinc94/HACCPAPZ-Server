
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule}     from '@angular/http';

import {} from '@angular/core/testing';

//Pages
import { AppComponent }             from './app.component';
import { HomeComponent }            from './home.component/home.component';
import { AboutComponent }           from './about.component/about.component';
import { LoginComponent }           from './login.component/login.component';
import { SignUpComponent }          from './sign-up.component/sign-up.component';
import { SettingsComponent }        from './settings.component/settings.component';
import { FitnessComponent }         from './fitness.component/fitness.component';
import { FitnessDetailComponent }   from './fitness.component/fitness-detail.component/fitness-detail.component';
import { FridgeTempComponent }      from './fridgeTemp.component/fridgeTemp.component';
import { TempRecComponent }         from './tempRecords.component/tempRec.component';
import { TempRecDetailComponent }   from './tempRecords.component/tempRec-detail.component/tempRec-detail.component';
import { HotholdComponent }         from './hothold.component/hothold.component';
import { HotholdDetailComponent }   from './hothold.component/hothold-detail.component/hothold-detail.component';
import { HygInsComponent }          from './hygIns.component/hygIns.component';
import { HygInsDetailComponent }    from './hygIns.component/hygIns-detail.component/hygIns-detail.component';
import { hygTraComponent }          from './hygTra.component/hygTra.component';
import { HygTraDetailComponent }    from './hygTra.component/hygTra-detail.component/hygTra-detail.component';
import { TransportComponent }       from './transport.component/transport.component';
import { TransportDetailComponent } from './transport.component/transport-detail.component/transport-detail.component';
import { DashboardComponent }       from './dashboard.component/dashboard.component';
import { FoodDeliveryComponent }       from './foodDelivery.component/foodDelivery.component';
import { FoodDeliveryDetailComponent }       from './foodDelivery.component/foodDelivery-detail.component/foodDelivery-detail.component';

//Services
//////////////////////////////////////////////////////////////
//Handles Routing
import { routing }          from './app.routing/app.routing';
//login and authenticaton services
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './testservice/user.service';
import { AuthenticationService } from './login.component/login.service';
//form service
import { FormService } from './FormService/form.service';
import { SettingsService } from './SettingsService/Settings.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        LoginComponent,
        SignUpComponent,
        SettingsComponent,
        FitnessComponent,
        FitnessDetailComponent,
        FridgeTempComponent,
        TempRecComponent,
        TempRecDetailComponent,
        HotholdComponent,
        HotholdDetailComponent,
        HygInsComponent,
        HygInsDetailComponent,
        hygTraComponent,
        HygTraDetailComponent,
        TransportComponent,
        TransportDetailComponent,
        DashboardComponent,
        FoodDeliveryComponent,
        FoodDeliveryDetailComponent,
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        FormService,
        SettingsService,
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
    
}