
import { NgModule, ApplicationRef}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule}     from '@angular/http';
import { CommonModule } from '@angular/common';

import {} from '@angular/core/testing';

//Pages
import { AppComponent }             from './app.component';
import { HomeComponent }            from './home.component/home.component';
import { AboutComponent }           from './about.component/about.component';
import { LoginComponent }           from './login.component/login.component';
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
import { FoodAnalysisComponent }         from './FoodAnalysis.component/FoodAnalysis.component';
import { AgmCoreModule } from 'angular2-google-maps/core';

//Services
//////////////////////////////////////////////////////////////
//Handles Routing
import { routing }          from './app.routing/app.routing';
//login and authenticaton services
import { AuthGuard } from './guards/auth.guard';

import { AuthenticationService } from './login.component/login.service';
//form service
import { FormService } from './FormService/form.service';
import { SettingsService } from './SettingsService/Settings.service';
import { AnalysisService } from './AnalysisService/analysis.service';

@NgModule({
    imports: [
        BrowserModule,
		CommonModule,
        FormsModule,
        HttpModule,
        routing,
		 AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqriJbrqEdrssuqCI1kDsstT-bhL6so7U'
    })
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        LoginComponent,
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
        FoodAnalysisComponent,
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        FormService,
        SettingsService,
        AnalysisService,
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
    
}