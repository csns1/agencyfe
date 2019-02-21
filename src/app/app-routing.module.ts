import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import {TravelPackageDetailsComponent} from './travelpackage/travel-package-details/travel-package-details.component';
import { BookingsComponent } from './bookings/bookings.component';
import {MakePaymentComponent} from './make-payment/make-payment.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
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
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
