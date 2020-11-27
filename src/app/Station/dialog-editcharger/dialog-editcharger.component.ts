import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StationsService} from '../../services/stations.service';
import {NotificationService} from '../../services/notification.service';
import {ChargingHead} from '../../model/chargingHead';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-editcharger',
  templateUrl: './dialog-editcharger.component.html',
  styleUrls: ['./dialog-editcharger.component.css']
})
export class DialogEditchargerComponent implements OnInit {

  chargingHeadForm = this.fb.group({
    type: ['', Validators.required],
    price: [0, Validators.required],
    name: ['', Validators.required]
  });

  public updated = false;
  public charger: ChargingHead;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DialogEditchargerComponent>, private fb: FormBuilder,
              private stationsService: StationsService, private notifyService: NotificationService, private authService: AuthService)
  { dialogRef.disableClose = true; this.updated = false; }


  ngOnInit(): void {
    this.charger = this.data.editable;
  }

  async Edit(): Promise<void>{
    let hadError = false;
    if (this.chargingHeadForm.valid) {
    this.notifyService.startUpdate();
    const newCharger = new ChargingHead(this.charger.id, this.data.editable.station.id, this.chargingHeadForm.value.price,
      this.chargingHeadForm.value.type, this.chargingHeadForm.value.name);
    await this.stationsService.editChargingHead(this.charger.id, newCharger).then(() => {},
      error => { this.notifyService.errorHandler(error); hadError = true; });
    this.updated = true;
    this.notifyService.stopUpdate();
    if (!hadError) {
     this.dialogRef.close(this.updated);
    }
    }
    else{
      this.notifyService.fullCustom('Fill all attribute!');
    }
  }
}
