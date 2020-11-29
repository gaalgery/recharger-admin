import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {OptionsComponent} from './options/options.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UsersComponent} from './User/users/users.component';
import {StationsComponent} from './Station/stations/stations.component';
import {AddUserComponent} from './User/add-user/add-user.component';
import {EditUserComponent} from './User/edit-user/edit-user.component';
import {NotificationService} from './services/notification.service';
import {AuthGuard} from './services/auth.guard';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './model/material/material.module';
import {AgmCoreModule} from '@agm/core';
import {UpdatingSnackbarComponent} from './snackbars/updating-snackbar/updating-snackbar.component';
import {MapComponent} from './Station/map/map.component';
import {AddStationComponent} from './Station/add-station/add-station.component';
import {EditStationComponent} from './Station/edit-station/edit-station.component';
import {StationChargersComponent} from './Station/station-chargers/station-chargers.component';
import {DialogNewchargerComponent} from './Station/dialog-newcharger/dialog-newcharger.component';
import {DialogEditchargerComponent} from './Station/dialog-editcharger/dialog-editcharger.component';
import {ChargingsComponent} from './Charging/chargings/chargings.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {StatisticsUsageComponent} from './Charging/statistics-usage/statistics-usage.component';
import {StatisticsIncomeComponent} from './Charging/statistics-income/statistics-income.component';
import {DatePipe} from '@angular/common';
import {StatisticsConsumptionComponent} from './Charging/statistics-consumption/statistics-consumption.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LogginginSnackbarComponent} from './snackbars/loggingin-snackbar/loggingin-snackbar.component';
import {LoggingoutSnackbarComponent} from './snackbars/loggingout-snackbar/loggingout-snackbar.component';
import {TokenExpiredSnackbarComponent} from './snackbars/token-expired-snackbar/token-expired-snackbar.component';
import {LoginFailedSnackbarComponent} from './snackbars/login-failed-snackbar/login-failed-snackbar.component';
import {CustomSnackbarComponent} from './snackbars/custom-snackbar/custom-snackbar.component';
import {EmailErrorSnackbarComponent} from './snackbars/email-error-snackbar/email-error-snackbar.component';
import {UnathorizedAccessSnackbarComponent} from './snackbars/unathorized-access-snackbar/unathorized-access-snackbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OptionsComponent,
    PageNotFoundComponent,
    UsersComponent,
    StationsComponent,
    AddUserComponent,
    EditUserComponent,
    UpdatingSnackbarComponent,
    MapComponent,
    AddStationComponent,
    EditStationComponent,
    StationChargersComponent,
    DialogNewchargerComponent,
    DialogEditchargerComponent,
    ChargingsComponent,
    StatisticsUsageComponent,
    StatisticsIncomeComponent,
    StatisticsConsumptionComponent,
    LogginginSnackbarComponent,
    LoggingoutSnackbarComponent,
    TokenExpiredSnackbarComponent,
    LoginFailedSnackbarComponent,
    CustomSnackbarComponent,
    EmailErrorSnackbarComponent,
    UnathorizedAccessSnackbarComponent,
  ],
  entryComponents: [UpdatingSnackbarComponent, DialogNewchargerComponent, DialogEditchargerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDjDDHfLoG7KK1y4AOJZJEraBtJrsP9OUA'
    }),
  ],
  providers: [NotificationService, DatePipe, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
