import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StationsService} from '../services/stations.service';
import {AuthService} from '../services/auth.service';
import {ChargingHead} from '../model/chargingHead';
import {Station} from '../model/station';

@Component({
  selector: 'app-dialog-editcharger',
  templateUrl: './dialog-editcharger.component.html',
  styleUrls: ['./dialog-editcharger.component.css']
})
export class DialogEditchargerComponent implements OnInit {

  public updated = false;
  public charger: ChargingHead;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DialogEditchargerComponent>,
              private stationsService: StationsService, private mainService: AuthService, )
  { dialogRef.disableClose = true; this.updated = false; }


  ngOnInit(): void {
    this.charger = this.data.editable;
  }

  async Edit(name: string, type: string, price: number): Promise<void>{
    this.mainService.startUpdate();
    const newCharger = new ChargingHead(this.charger.id, this.data.editable.station.id, price, type, name);
    await this.stationsService.editChargingHead(this.charger.id, newCharger);
    this.updated = true;
    this.mainService.stopUpdate();
  }
}
