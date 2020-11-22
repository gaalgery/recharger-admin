import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {OptionsComponent} from './options/options.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';
import { StationsComponent } from './stations/stations.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AuthGuard } from './services/auth.guard';
import { MapComponent } from './map/map.component';
import { AddStationComponent } from './add-station/add-station.component';
import { EditStationComponent } from './edit-station/edit-station.component';
import {StationChargersComponent} from './station-chargers/station-chargers.component';
import {ChargingsComponent} from './chargings/chargings.component';
import { StatisticsUsageComponent } from './statistics-usage/statistics-usage.component';
import { StatisticsIncomeComponent } from './statistics-income/statistics-income.component';
import {StatisticsConsumptionComponent} from './statistics-consumption/statistics-consumption.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'options', component: OptionsComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'stations', component: StationsComponent, canActivate: [AuthGuard]},
  {path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard]},
  {path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard]},
  {path: 'edit-station/:id', component: EditStationComponent, canActivate: [AuthGuard]},
  {path: 'chargers/:id', component: StationChargersComponent, canActivate: [AuthGuard]},
  {path: 'map/:id', component: MapComponent, canActivate: [AuthGuard] },
  {path: 'add-station', component: AddStationComponent, canActivate: [AuthGuard] },
  {path: 'chargings', component: ChargingsComponent, canActivate: [AuthGuard] },
  {path: 'statistics/usage', component: StatisticsUsageComponent, canActivate: [AuthGuard] },
  {path: 'statistics/income', component: StatisticsIncomeComponent, canActivate: [AuthGuard] },
  {path: 'statistics/consumption', component: StatisticsConsumptionComponent, canActivate: [AuthGuard] },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
