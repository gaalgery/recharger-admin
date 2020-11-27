import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StationsService} from '../../services/stations.service';
import {Station} from '../../model/station';
import {NotificationService} from '../../services/notification.service';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.css']
})
export class AddStationComponent implements OnInit {

  stationForm = this.fb.group({
    address: ['', Validators.required],
    coordinatelon: [0, Validators.required],
    coordinatelat: [0, Validators.required],
    phone: ['', Validators.required],
    state: ['Closed']
  });

  constructor(private router: Router, private stations: StationsService, private fb: FormBuilder,
              private notifyService: NotificationService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async addNewStation(): Promise<void>{
    let hadError = false;
    if (!this.notifyService.getUpdateStatus()) {
      if (this.stationForm.valid) {
        this.notifyService.startUpdate();
        await this.stations.addStation(new Station(0, this.stationForm.value.address, this.stationForm.value.coordinatelon,
          this.stationForm.value.coordinatelat, this.stationForm.value.state, this.stationForm.value.phone)).then(() => {
          },
          error => {
            this.notifyService.errorHandler(error);
            hadError = true;
          });
        this.notifyService.stopUpdate();
      }
      if (!hadError){
        this.goToPage('stations');
      }
    }
  }

  goToPage(pageName: string): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  logout(): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.authService.logout().then(() => {}, error => { this.notifyService.errorHandler(error); });
    }
  }

}
