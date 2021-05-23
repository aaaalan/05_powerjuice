import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationListItemComponent } from './location-list-item/location-list-item.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationStoreService } from './shared/location-store.service';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchComponent } from './home/search/search.component';
import localeDe from '@angular/common/locales/de';
import { DatePipe, registerLocaleData } from '@angular/common';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { VaccinationListItemComponent } from './vaccination-list-item/vaccination-list-item.component';
import { VaccinationStoreService } from './shared/vaccination-store.service';
import { VaccinationFormComponent } from './vaccination-form/vaccination-form.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './shared/authentication-service';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { JwtInterceptorService } from './shared/jwt.interceptor.service';
import { UserFormComponent } from './user-form/user-form.component';
import { UserStoreService } from './shared/user-store.service';

registerLocaleData(localeDe);

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    LocationListComponent,
    LocationListItemComponent,
    LocationDetailsComponent,
    HomeComponent,
    SearchComponent,
    VaccinationDetailsComponent,
    VaccinationListComponent,
    VaccinationListItemComponent,
    VaccinationFormComponent,
    LoginComponent,
    UserFormComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthenticationService,
    LocationStoreService,
    VaccinationStoreService,
    UserStoreService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'de' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ]
})
export class AppModule {}
