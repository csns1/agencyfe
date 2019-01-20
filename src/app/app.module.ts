import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { SidebarJSModule } from 'ng-sidebarjs';
import { FilterComponent } from './home/filter/filter.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { TravelPackageDetailsComponent } from './travelpackage/travel-package-details/travel-package-details.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    FilterComponent,
    UserManagementComponent,
    TravelPackageDetailsComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SidebarJSModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ButtonsModule.forRoot(),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD_ZsaDIK6KiJZo1dtLxPTZjhBfrgTZEeA",
      authDomain: "travel-agency-78884.firebaseapp.com",
      databaseURL: "https://travel-agency-78884.firebaseio.com",
      projectId: "travel-agency-78884",
      storageBucket: "travel-agency-78884.appspot.com",
      messagingSenderId: "822784991290"
    }),
    AngularFireStorageModule,
    ProgressbarModule.forRoot()
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
