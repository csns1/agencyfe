import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AngularDateTimePickerModule} from 'angular2-datetimepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {httpInterceptorProviders} from './auth/auth-interceptor';
import {SidebarJSModule} from 'ng-sidebarjs';
import {FilterComponent} from './home/filter/filter.component';
import {UserManagementComponent} from './admin/user-management/user-management.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {TravelPackageDetailsComponent} from './travelpackage/travel-package-details/travel-package-details.component';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {UploadFormComponent} from './uploads/upload-form/upload-form.component';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {BookingsComponent} from './bookings/bookings.component';
import {MatConfirmDialogComponent} from './matconfirmdialog/matconfirmdialog.component';
import {MaterialModule} from './material.module';
import {CdkTableModule} from '@angular/cdk/table';
import {MakePaymentComponent} from './make-payment/make-payment.component';
import {NgxStripeModule} from 'ngx-stripe';
import {MatButtonModule, MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {TravelPackageListComponent} from './travelpackage/travel-package-list/travel-package-list.component';
import {TravelPackageEditComponent} from './travelpackage/travel-package-edit/travel-package-edit.component';
import {LoadingSpinnerComponent} from './commons/loading-spinner/loading-spinner.component';
import {LoaderServiceInterceptorService} from './services/loader-service-interceptor.service';
import {ProfileComponent} from './user/profile/profile.component';
import {DestinationComponent} from './admin/destination/destination.component';
import {SelectDropDownModule} from 'ngx-select-dropdown'
import {PrintService} from './services/print.service';
import {PackageDatesAdminComponent} from './package-dates-admin/package-dates-admin.component';
import {NgxPayPalModule} from 'ngx-paypal';
import {CompletePaymentComponent} from './make-payment/complete-payment/complete-payment.component';
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";


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
    UploadFormComponent,
    BookingsComponent,
    MatConfirmDialogComponent,
    MakePaymentComponent,
    MatConfirmDialogComponent,
    TravelPackageListComponent,
    TravelPackageEditComponent,
    LoadingSpinnerComponent,
    ProfileComponent,
    DestinationComponent,
    PackageDatesAdminComponent,
    CompletePaymentComponent

  ],
  entryComponents: [MatConfirmDialogComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularMultiSelectModule,
    HttpClientModule,
    SidebarJSModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxStripeModule.forRoot('pk_test_m78iHmSm4JWRIukZimfFRel9'),
    ButtonsModule.forRoot(),
    MaterialModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CdkTableModule,
    NgxPayPalModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD_ZsaDIK6KiJZo1dtLxPTZjhBfrgTZEeA",
      authDomain: "travel-agency-78884.firebaseapp.com",
      databaseURL: "https://travel-agency-78884.firebaseio.com",
      projectId: "travel-agency-78884",
      storageBucket: "travel-agency-78884.appspot.com",
      messagingSenderId: "822784991290"
    }),
    AngularFireStorageModule,
    ProgressbarModule.forRoot(),
    AngularDateTimePickerModule,
    SelectDropDownModule
  ],
  providers: [httpInterceptorProviders, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderServiceInterceptorService,
    multi: true
  }, PrintService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
