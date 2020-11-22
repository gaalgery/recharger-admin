import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StationsService} from '../services/stations.service';
import {Station} from '../model/station';
import { AuthService } from '../services/auth.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.css']
})
export class AddStationComponent implements OnInit {

  addUser = new FormControl();

  constructor(private router: Router, private stations: StationsService, private mainService: AuthService ) { }

  ngOnInit(): void {
  }

  async addNewStation(address: string, coordinateLon: number, coordinateLat: number, phone: string, state: string): Promise<void>{
    if (!this.mainService.getUpdateStatus()) {
      this.mainService.startUpdate();
      await this.stations.addStation(new Station(0, address, coordinateLon, coordinateLat, state, phone));
      this.mainService.stopUpdate();
      this.goToPage('stations');
    }
  }

  goToPage(pageName: string): void{
    if (!this.mainService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  logout(): void{
    this.mainService.logout();
  }

}
