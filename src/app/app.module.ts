import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OptionsComponent } from './options/options.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';
import { StationsComponent } from './stations/stations.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AgmCoreModule } from '@agm/core';
import { UpdatingSnackbarComponent } from './updating-snackbar/updating-snackbar.component';
import { MapComponent } from './map/map.component';
import { AddStationComponent } from './add-station/add-station.component';
import { EditStationComponent } from './edit-station/edit-station.component';
import { StationChargersComponent } from './station-chargers/station-chargers.component';
import { DialogNewchargerComponent } from './dialog-newcharger/dialog-newcharger.component';
import { DialogEditchargerComponent } from './dialog-editcharger/dialog-editcharger.component';
import { ChargingsComponent } from './chargings/chargings.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticsUsageComponent } from './statistics-usage/statistics-usage.component';
import { StatisticsIncomeComponent } from './statistics-income/statistics-income.component';
import {DatePipe} from '@angular/common';
import { StatisticsConsumptionComponent } from './statistics-consumption/statistics-consumption.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogginginSnackbarComponent } from './loggingin-snackbar/loggingin-snackbar.component';
import { LoggingoutSnackbarComponent } from './loggingout-snackbar/loggingout-snackbar.component';


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
  providers: [AuthService, DatePipe, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
