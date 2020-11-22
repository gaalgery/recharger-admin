import {Component, HostListener, OnInit} from '@angular/core';
import { ChargingHead } from '../model/chargingHead';
import {StationsService} from '../services/stations.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogNewchargerComponent} from '../dialog-newcharger/dialog-newcharger.component';
import {DialogEditchargerComponent} from '../dialog-editcharger/dialog-editcharger.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-station-chargers',
  templateUrl: './station-chargers.component.html',
  styleUrls: ['./station-chargers.component.css']
})
export class StationChargersComponent implements OnInit {

  public id;
  public chargers: ChargingHead[] = [];
  displayedColumns: string[] = ['id', 'name', 'type', 'price', 'options'];

  constructor(private stationService: StationsService, private router: Router,
              private mainService: AuthService, private active: ActivatedRoute, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.mainService.startUpdate();
    const id = this.active.snapshot.paramMap.get('id');
    this.id = id;
    await this.getHeads();
    this.mainService.stopUpdate();
  }

  async getHeads(): Promise<void>{
    this.mainService.startUpdate();
    await this.stationService.getChargers(this.id)
      .then(res => {  this.chargers = res; console.log(res); });
    this.mainService.stopUpdate();
  }

  goToPage(pageName: string): void{
    if (!this.mainService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  async deleteChager(id: number): Promise<void> {
    if (!this.mainService.getUpdateStatus()){
      this.mainService.startUpdate();
      await this.stationService.deleteChargingHead(id);
      this.mainService.stopUpdate();
      await this.getHeads();
    }
  }

  async editCharger(charger: ChargingHead): Promise<void> {
    if (!this.mainService.getUpdateStatus()){
      this.mainService.startUpdate();

      const dialogR = this.dialog.open(DialogEditchargerComponent, {data: {editable: charger}});
      dialogR.afterClosed().subscribe(res => { if (Boolean(res)){ this.ngOnInit(); } });

      this.mainService.stopUpdate();
    }
  }

  async addNewCharger(): Promise<void> {
    if (!this.mainService.getUpdateStatus()){
      this.mainService.startUpdate();

      const dialogR = this.dialog.open(DialogNewchargerComponent, {data: {stationID: this.id}});
      dialogR.afterClosed().subscribe(res => { if (Boolean(res)){ this.ngOnInit(); } });

      this.mainService.stopUpdate();
    }
  }

  logout(): void{
    this.mainService.logout();
  }

}
