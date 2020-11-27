import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StationsService} from '../../services/stations.service';
import {Station} from '../../model/station';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-station',
  templateUrl: './edit-station.component.html',
  styleUrls: ['./edit-station.component.css']
})
export class EditStationComponent implements OnInit {

  stationForm = this.fb.group({
    address: ['', Validators.required],
    coordinatelon: [0, Validators.required],
    coordinatelat: [0, Validators.required],
    phone: ['', Validators.required],
    state: ['']
  });

  public id;
  public station: Station = new Station(0, '', 0, 0, '', '');

  constructor(private active: ActivatedRoute, private stationService: StationsService, private fb: FormBuilder,
              private router: Router, private notifyService: NotificationService, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.notifyService.startUpdate();
    const id = this.active.snapshot.paramMap.get('id');
    this.id = id;

    await this.stationService.getStation(id)
      .then(res => {
        this.station = res;
      },
        error => this.notifyService.errorHandler(error));
    this.notifyService.stopUpdate();
  }

  goToPage(pageName: string): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  async EditStation(): Promise<void>{
    let hadError = false;
    if (!this.notifyService.getUpdateStatus() && this.stationForm.valid) {
      this.notifyService.startUpdate();
      await this.stationService.editStation(this.id, this.station).then(() => {},
        error => { this.notifyService.errorHandler(error); hadError = true; });
      this.notifyService.stopUpdate();
    }

    if (!hadError){
      this.goToPage('stations');
    }
  }

  logout(): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.authService.logout().then(() => {}, error => { this.notifyService.errorHandler(error); });
    }
  }
}
