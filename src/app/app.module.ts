import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { PlaceYourBetComponent } from './place-your-bet/place-your-bet.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RouterModule } from '@angular/router';
import { MenubarComponent } from './menubar/menubar.component';
import { CanActivateTeamService } from './services/can-activate-team.service';
import { UserToken,Permissions } from './Content/Permissions';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlaceYourBetComponent,
    UserManagementComponent,
    MenubarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'placebet', component: PlaceYourBetComponent },
      {path: 'manage',component: UserManagementComponent,canActivate: [CanActivateTeamService] },
      {path: '',component: LoginComponent }
    ])
  ],
  providers: [CanActivateTeamService, UserToken, Permissions],
  bootstrap: [AppComponent]
})
export class AppModule { }
