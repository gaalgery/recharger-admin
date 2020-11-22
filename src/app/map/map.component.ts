import {Component, HostListener, OnInit} from '@angular/core';
import {StationsService} from '../services/stations.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Station} from '../model/station';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private stationService: StationsService, private router: Router,
              private mainService: AuthService, private active: ActivatedRoute) { this.zoom = 8; this.stations.push(new Station(0, '', 0, 0, 'Open', '+36301234567')); }

  public id;
  public zoom = 8;
  public stations: Station[] = [];

  previous;

  async ngOnInit(): Promise<void> {
    this.mainService.startUpdate();
    const id = this.active.snapshot.paramMap.get('id');
    this.id = id;
    await this.stationService.getStation(id)
      .then(res => {
        this.stations = [];
        this.stations.push(res);
      });
    this.mainService.stopUpdate();
  }

  goToPage(pageName: string): void{
    if (!this.mainService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  async showAll(): Promise<void>{
    this.mainService.startUpdate();
    await this.stationService.getStations()
      .then(res => {  this.stations = res;  });
    this.mainService.stopUpdate();
  }

  clickedMarker(infowindow): void {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

  showChargers(ID: number): void{
    if (!this.mainService.getUpdateStatus()) {
      this.router.navigate(['/chargers', ID]);
    }
  }

  logout(): void{
    this.mainService.logout();
  }
}
