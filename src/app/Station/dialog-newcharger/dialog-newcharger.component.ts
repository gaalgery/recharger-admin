import {Component, Inject, OnInit} from '@angular/core';
import {ChargingHead} from '../../model/chargingHead';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StationsService} from '../../services/stations.service';
import {NotificationService} from '../../services/notification.service';
import {FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-dialog-newcharger',
  templateUrl: './dialog-newcharger.component.html',
  styleUrls: ['./dialog-newcharger.component.css']
})
export class DialogNewchargerComponent implements OnInit {

  chargingHeadForm = this.fb.group({
    type: ['', Validators.required],
    price: [0, Validators.required],
    name: ['', Validators.required]
  });

  public updated = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
              private dialogRef: MatDialogRef<DialogNewchargerComponent>,
              private stationsService: StationsService, private notifyService: NotificationService)
  { dialogRef.disableClose = true; this.updated = false; }

  ngOnInit(): void {
  }

  Add(): void {
    let hadError = false;
    if (this.chargingHeadForm.valid) {
      this.notifyService.startUpdate();
      this.stationsService.addCharger(new ChargingHead(0, Number(this.data.stationID), this.chargingHeadForm.value.price,
        this.chargingHeadForm.value.type, this.chargingHeadForm.value.name)).then(() => {
        },
        error => {
          this.notifyService.errorHandler(error); hadError = true;
        });
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
