import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LogoutComponent } from '../logout/logout.component';
import { RegisterComponent } from '../register/register.component';
import { ActivateAccountComponent } from '../activate-account/activate-account.component';
import { MainComponent} from '../main/main.component';
import { ProfileComponent} from '../profile/profile.component';
import { AdsviewComponent} from '../adsview/adsview.component';
import { AdslistComponent } from '../adslist/adslist.component';
import { AdseditComponent } from '../adsedit/adsedit.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { CookiepolicyComponent } from '../cookiepolicy/cookiepolicy.component';
import { ChatComponent } from '../chat/chat.component';
import { MessagesComponent } from '../messages/messages.component';
import { MyadsComponent } from '../myads/myads.component';
import { ClockComponent } from '../clock/clock.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate', component: ActivateAccountComponent },

  { path: 'main', component: MainComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'adsview', component: AdsviewComponent},
  { path: 'adslist', component: AdslistComponent},
  { path: 'adsedit', component: AdseditComponent},
  { path: 'file', component: FileuploadComponent},
  { path: 'cookiepolicy', component: CookiepolicyComponent},
  { path: 'chat/:id', component: ChatComponent},
  { path: 'messages', component: MessagesComponent},
  { path: 'myads', component: MyadsComponent},
  { path: 'clock', component: ClockComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
