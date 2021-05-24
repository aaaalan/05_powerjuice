import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationListComponent } from './location-list/location-list.component';
import { HomeComponent } from './home/home.component';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { VaccinationFormComponent } from './vaccination-form/vaccination-form.component';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CanNavigateToAdminGuard } from './shared/can-navigate-to-admin.guard';
import { LocationFormComponent } from './location-form/location-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'locations', component: LocationListComponent },
  { path: 'locations/:id', component: LocationDetailsComponent },
  { path: 'vaccinations', component: VaccinationListComponent },
  { path: 'vaccinations/:id', component: VaccinationDetailsComponent },
  {
    path: 'admin',
    component: VaccinationFormComponent,
    canActivate: [CanNavigateToAdminGuard]
  },
  { path: 'admin/:id', component: VaccinationFormComponent },
  { path: 'registration', component: UserFormComponent },
  { path: 'registration/:vaccination_id', component: UserFormComponent },
  { path: 'registration/edit-user/:id', component: UserFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'local-admin', component: LocationFormComponent },
  { path: 'local-admin/:id', component: LocationFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToAdminGuard]
})
export class AppRoutingModule {}
