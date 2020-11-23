import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Charging } from '../model/charging';
import { ChargingsService } from '../services/chargings.service';
import { AuthService } from '../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Station} from '../model/station';
import {StationsService} from '../services/stations.service';
import { DatePipe } from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-chargings',
  templateUrl: './chargings.component.html',
  styleUrls: ['./chargings.component.css']
})
export class ChargingsComponent implements OnInit, AfterViewInit {

  public Chargings: Charging[] = [];
  public stations: Station[] = [];

  minDate = new Date(2020, 9, 30);
  maxDate = new Date();

  public numberOfChargings = 0;
  chargingsData = new MatTableDataSource(this.Chargings);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  stationsForm = new FormControl();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  // itt majd meg kell kiiratni adatot
  displayedColumns: string[] = ['id', 'consumption', 'price', 'begin', 'end', 'user', 'station', 'chargingHead'];

  constructor(private router: Router, private chargingsService: ChargingsService, public datepipe: DatePipe,
              private mainService: AuthService, private stationService: StationsService) { }

  async ngOnInit(): Promise<void> {
    this.chargingsData = new MatTableDataSource(this.Chargings);
    this.chargingsData.paginator = this.paginator;
    await this.getStations();
    this.refreshDataSource();
  }

  refreshDataSource(): void {
    if (!this.mainService.getUpdateStatus()) {
      this.mainService.startUpdate();

      const stationsList = this.stationsForm.value == null ? [] : this.stationsForm.value;
      const startRange = this.range.value.start == null ? new Date(2000, 0, 1) : this.range.value.start;
      const endRange = this.range.value.end == null ? new Date() : this.range.value.end;

      this.chargingsService.getSelectedChargings(startRange, endRange,
        stationsList, this.paginator.pageIndex, this.paginator.pageSize).then(
        res => {
          this.numberOfChargings = res.totalElements;
          this.chargingsData.data = res.content;
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

  find(id: number): string{
    return this.stations.find(x => x.id === id).address;
  }

  goToPage(pageName: string): void{
    if (!this.mainService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  goToPageQuery(pageName: string): void{
    if (!this.mainService.getUpdateStatus()) {
      const start = this.datepipe.transform(this.range.value.start, 'shortDate');
      const end = this.datepipe.transform(this.range.value.end, 'shortDate');
      this.router.navigate([`${pageName}`], { queryParams:
          { stations: JSON.stringify(this.stationsForm.value), startDate: start, endDate: end } });
    }
  }

  async getChargigs(): Promise<void>{
    this.mainService.startUpdate();
    await this.chargingsService.getChargings()
      .then(res => {  this.Chargings = res; });
    this.mainService.stopUpdate();
  }

  async getStations(): Promise<void>{
    this.mainService.startUpdate();
    await this.stationService.getStations()
      .then(res => {  this.stations = res; });
    this.mainService.stopUpdate();
  }

  async deleteCharging(ID: number): Promise<void>{
    if (!this.mainService.getUpdateStatus()) {
      this.mainService.startUpdate();
      await this.chargingsService.deleteCharging(ID);
      this.mainService.stopUpdate();
      this.refreshDataSource();
    }
  }

  logout(): void{
    this.mainService.logout();
  }

}
