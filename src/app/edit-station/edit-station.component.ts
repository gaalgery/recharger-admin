import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StationsService} from '../services/stations.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Station} from '../model/station';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-station',
  templateUrl: './edit-station.component.html',
  styleUrls: ['./edit-station.component.css']
})
export class EditStationComponent implements OnInit {

  public id;
  public station: Station = new Station(0, '', 0, 0, 'Open', '+36301234567');

  constructor(private active: ActivatedRoute, private stationService: StationsService,
              private router: Router, private mainService: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.mainService.startUpdate();
    const id = this.active.snapshot.paramMap.get('id');
    this.id = id;

    await this.stationService.getStation(id)
      .then(res => {
        this.station = res;
      });
    this.mainService.stopUpdate();
  }

  goToPage(pageName: string): void{
    if (!this.mainService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  async EditStation(address: string, coordinateLon: number, coordinateLat: number, phone: string, state: string): Promise<void>{
    if (!this.mainService.getUpdateStatus()) {
      this.mainService.startUpdate();
      await this.stationService.editStation(this.id, new Station(0, address, coordinateLon, coordinateLat, state, phone));
      this.mainService.stopUpdate();
    }
  }

  logout(): void{
    this.mainService.logout();
  }
}
