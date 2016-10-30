
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {} from '@angular/core/testing';

//Pages
import { AppComponent }             from './app.component';
import { HomeComponent }           from './home.component/home.component';
import { AboutComponent }           from './about.component/about.component';
import { LoginComponent }           from './login.component/login.component';
import { SignUpComponent }          from './sign-up.component/sign-up.component';
import { SettingsComponent }        from './settings.component/settings.component';

//Services
import { routing }          from './app.routing/app.routing';

// used to create fake backend
//import { fakeBackendProvider } from './helpers/fake-backend';
//import { MockBackend, MockConnection } from '@angular/http/testing';
//import { BaseRequestOptions } from '@angular/http';

//handles login and authenticaton
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './testservice/user.service';
import { AuthenticationService } from './login.component/login.service';


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
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
 
        // providers used to create fake backend
       // fakeBackendProvider,
        //MockBackend,
        //BaseRequestOptions
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
    
}