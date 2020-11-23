import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { Station } from '../model/station';
import { StationsService } from '../services/stations.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit, AfterViewInit {

  stationSearch = new FormGroup(
    {
      stationAddress: new FormControl(''),
      stationState: new FormControl(''),
      stationPhone: new FormControl(''),
    }
  );

  public numberOfUsers = 0;
  public stations: Station[] = [];
  displayedColumns: string[] = ['id', 'address', 'state', 'phone', 'options'];
  stationsData = new MatTableDataSource(this.stations);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private stationService: StationsService, private router: Router, private mainService: AuthService) { }

  ngOnInit(): void {
    this.stationsData = new MatTableDataSource(this.stations);
    this.stationsData.paginator = this.paginator;
  }

  async refreshDataSource(): Promise<void> {
    if (!this.mainService.getUpdateStatus()) {
      this.mainService.startUpdate();

      await this.stationService.geSelectedStations(this.stationSearch.value.stationAddress, this.stationSearch.value.stationState,
        this.stationSearch.value.stationPhone, this.paginator.pageIndex, this.paginator.pageSize).then(
        res => {
          this.numberOfUsers = res.totalElements;
          this.stationsData.data = res.content;
        }
      );

      this.mainService.stopUpdate();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.paginator.page.subscribe(() => {
        this.refreshDataSource();
      });
      this.refreshDataSource();
    });
  }

  async getStations(): Promise<void>{
    this.mainService.startUpdate();
    await this.stationService.getStations()
      .then(res => {  this.stations = res;  console.log(res); });
    this.mainService.stopUpdate();
  }

  goToPage(pageName: string): void{
    if (!this.mainService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  editStation(ID: number): void{
    if (!this.mainService.getUpdateStatus()) {
       this.router.navigate(['/edit-station', ID]);
    }
  }

  showChargers(ID: number): void{
    if (!this.mainService.getUpdateStatus()) {
      this.router.navigate(['/chargers', ID]);
    }
  }

  async deleteStation(ID: number): Promise<void>{
    if (!this.mainService.getUpdateStatus()) {
      this.mainService.startUpdate();
      await this.stationService.deleteStation(ID);
      this.mainService.stopUpdate();
      await this.refreshDataSource();
    }
  }

  map(ID: number): void{
    if (!this.mainService.getUpdateStatus()) {
      this.router.navigate(['/map', ID]);
    }
  }

  logout(): void{
    this.mainService.logout();
  }
}
