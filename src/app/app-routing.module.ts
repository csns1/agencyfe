import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import {TravelPackageDetailsComponent} from './travelpackage/travel-package-details/travel-package-details.component';
import {BookingsComponent} from './bookings/bookings.component';
import {TravelPackageListComponent} from './travelpackage/travel-package-list/travel-package-list.component';
import {TravelPackageEditComponent} from './travelpackage/travel-package-edit/travel-package-edit.component';
import {ProfileComponent} from './user/profile/profile.component';
import {DestinationComponent} from './admin/destination/destination.component';
import {MakePaymentComponent} from './make-payment/make-payment.component';
import {PackageDatesAdminComponent} from './package-dates-admin/package-dates-admin.component';
import {CompletePaymentComponent} from "./make-payment/complete-payment/complete-payment.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'complete/payment',
    component: CompletePaymentComponent
  },

  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'bookings',
    component: BookingsComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'payment',
    component: MakePaymentComponent
  },
  {
    path: 'travel-package-details/:id',
    component: TravelPackageDetailsComponent
  },
  {
    path: 'travel-packages',
    component: TravelPackageListComponent
  },
  {
    path: 'travel-package-edit/:id',
    component: TravelPackageEditComponent
  },

  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'admin/destination',
    component: DestinationComponent
  },
  {
    path: 'admin/package-dates',
    component: PackageDatesAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
