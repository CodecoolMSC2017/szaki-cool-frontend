import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { GreetingsComponent } from './greetings/greetings.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { AdspreviewComponent } from './adspreview/adspreview.component';
import { HeaderComponent } from './header/header.component';
import { AdsviewComponent } from './adsview/adsview.component';
import { MainComponent } from './main/main.component';
import { FileuploadComponent } from './fileupload/fileupload.component';


@NgModule({
  declarations: [
    AppComponent,
    GreetingsComponent,
    RegisterComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    LogoutComponent,
    ProfileComponent,
    AdspreviewComponent,
    HeaderComponent,
    FileuploadComponent,
    AdsviewComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
