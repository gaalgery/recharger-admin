import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Station} from '../../model/station';
import {StationsService} from '../../services/stations.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {FormBuilder} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit, AfterViewInit {

  stationSearch = this.fb.group({
    address: [''],
    state: [''],
    phone: ['']
  });

  public numberOfUsers = 0;
  public stations: Station[] = [];
  displayedColumns: string[] = ['id', 'address', 'phone', 'state', 'options'];
  stationsData = new MatTableDataSource(this.stations);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private stationService: StationsService, private router: Router, private fb: FormBuilder,
              private notifyService: NotificationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.stationsData = new MatTableDataSource(this.stations);
    this.stationsData.paginator = this.paginator;
  }

  async refreshDataSource(): Promise<void> {
    if (!this.notifyService.getUpdateStatus()) {
      this.notifyService.startUpdate();

      await this.stationService.geSelectedStations(this.stationSearch.value.address, this.stationSearch.value.state,
        this.stationSearch.value.phone, this.paginator.pageIndex, this.paginator.pageSize).then(
        res => {
          this.numberOfUsers = res.totalElements;
          this.stationsData.data = res.content;
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

  goToPage(pageName: string): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  editStation(ID: number): void{
    if (!this.notifyService.getUpdateStatus()) {
       this.router.navigate(['/edit-station', ID]);
    }
  }

  showChargers(ID: number): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.router.navigate(['/chargers', ID]);
    }
  }

  async deleteStation(ID: number): Promise<void>{
    let hadError = false;
    if (!this.notifyService.getUpdateStatus()) {
      this.notifyService.startUpdate();
      await this.stationService.deleteStation(ID).then(() => {},
        error => { this.notifyService.errorHandler(error); hadError = true; });
      this.notifyService.stopUpdate();

      if (!hadError) {
        await this.refreshDataSource();
      }
    }
  }

  map(ID: number): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.router.navigate(['/map', ID]);
    }
  }

  logout(): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.authService.logout().then(() => {}, error => { this.notifyService.errorHandler(error); });
    }
  }
}
