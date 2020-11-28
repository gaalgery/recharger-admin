import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Charging} from '../../model/charging';
import {ChargingsService} from '../../services/chargings.service';
import {NotificationService} from '../../services/notification.service';
import {FormControl} from '@angular/forms';
import {Station} from '../../model/station';
import {StationsService} from '../../services/stations.service';
import {DatePipe} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AuthService} from '../../services/auth.service';

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
  start = new FormControl();
  end = new FormControl();

  displayedColumns: string[] = ['id', 'consumption', 'price', 'begin', 'end', 'user', 'station', 'chargingHead'];

  constructor(private router: Router, private chargingsService: ChargingsService, public datepipe: DatePipe,
              private notifyService: NotificationService, private authService: AuthService, private stationService: StationsService) { }

  async ngOnInit(): Promise<void> {
    this.chargingsData = new MatTableDataSource(this.Chargings);
    this.chargingsData.paginator = this.paginator;
    await this.getStations();
    this.refreshDataSource();
  }

  refreshDataSource(): void {
    if (!this.notifyService.getUpdateStatus()) {
      this.notifyService.startUpdate();
      const stationsList = this.stationsForm.value == null ? [] : this.stationsForm.value;
      const startRange = this.start.value == null ? new Date(2000, 0, 1) : this.start.value;
      const endRange = this.end.value == null ? new Date() : this.end.value;

      this.chargingsService.getSelectedChargings(startRange, endRange,
        stationsList, this.paginator.pageIndex, this.paginator.pageSize).then(
        res => {
          this.numberOfChargings = res.totalElements;
          this.chargingsData.data = res.content;
        },
        error => { this.notifyService.errorHandler(error); }
      );
      this.notifyService.stopUpdate();
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
    if (!this.notifyService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  goToPageQuery(pageName: string): void{
    if (!this.notifyService.getUpdateStatus()) {

      const stationsList = this.stationsForm.value == null ? [] : this.stationsForm.value;
      const startRange = this.start.value == null ? new Date(2000, 0, 1) : this.start.value;
      const endRange = this.end.value == null ? new Date() : this.end.value;

      this.router.navigate([`${pageName}`], { queryParams:
          { stations: stationsList, startDate: startRange, endDate: endRange } });
    }
  }

  async getStations(): Promise<void>{
    this.notifyService.startUpdate();
    await this.stationService.getStations()
      .then(res => {  this.stations = res; },
        error => { this.notifyService.errorHandler(error); });
    this.notifyService.stopUpdate();
  }

  async deleteCharging(ID: number): Promise<void>{
    if (!this.notifyService.getUpdateStatus()) {
      this.notifyService.startUpdate();
      await this.chargingsService.deleteCharging(ID);
      this.notifyService.stopUpdate();
      this.refreshDataSource();
    }
  }

  logout(): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.authService.logout().then(() => {}, error => { this.notifyService.errorHandler(error); });
    }
  }

}
