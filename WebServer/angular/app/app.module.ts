
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule}    from '@angular/http';

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
import { HygInsComponent }         from './hygIns.component/hygIns.component';
import { HygInsDetailComponent }   from './hygIns.component/hygIns-detail.component/hygIns-detail.component';


//Services
import { routing }          from './app.routing/app.routing';
//handles login and authenticaton
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './testservice/user.service';
import { AuthenticationService } from './login.component/login.service';
//form services
import { FitnessService }    from './fitness.component/fitness.service';
import { TempService }       from './fridgeTemp.component/fridgeTemp.service';
import { FormService }       from './FormService/form.service';

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
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        FitnessService,
        TempService,
        FormService,
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
    
}