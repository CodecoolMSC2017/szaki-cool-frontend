import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LogoutComponent } from '../logout/logout.component';
import { RegisterComponent } from '../register/register.component';
import { ActivateAccountComponent } from '../activate-account/activate-account.component';
import { ProfileComponent} from '../profile/profile.component'
import { FileuploadComponent } from '../fileupload/fileupload.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate', component: ActivateAccountComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'file', component: FileuploadComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
