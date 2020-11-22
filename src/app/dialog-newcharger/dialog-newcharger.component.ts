import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {ChargingHead} from '../model/chargingHead';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StationsService} from '../services/stations.service';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-dialog-newcharger',
  templateUrl: './dialog-newcharger.component.html',
  styleUrls: ['./dialog-newcharger.component.css']
})
export class DialogNewchargerComponent implements OnInit {

  public updated = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DialogNewchargerComponent>,
              private stationsService: StationsService, private mainService: AuthService, )
  { dialogRef.disableClose = true; this.updated = false; }

  ngOnInit(): void {
  }

  Add(name: string, type: string, price: number): void {
    this.mainService.startUpdate();
    this.stationsService.addCharger(new ChargingHead(0, Number(this.data.stationID), price, type, name));
    this.updated = true;
    this.mainService.stopUpdate();
}

}
