import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {ChargingsService} from '../../services/chargings.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-statistics-consumption',
  templateUrl: './statistics-consumption.component.html',
  styleUrls: ['./statistics-consumption.component.css']
})
export class StatisticsConsumptionComponent implements OnInit {

  consumption = [];
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Consumption';
  timeline = true;

  startDate: Date;
  endDate: Date;
  stations: string[];

  constructor(private router: Router, private notifyService: NotificationService, private authService: AuthService,
              private chargingsService: ChargingsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.startDate = params.startDate;
        this.endDate = params.endDate;
        this.stations = params.stations;
      });
    this.getConsumption();
  }


  goToPage(pageName: string): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  async getConsumption(): Promise<void>{
    this.notifyService.startUpdate();
    await this.chargingsService.getConsumption(new Date(this.startDate), new Date(this.endDate), this.stations == null ? [] : this.stations)
      .then(res => {  this.consumption = res; this.formatToDate(); }, error => { this.notifyService.errorHandler(error); });

    this.notifyService.stopUpdate();
  }

  formatToDate(): void{

    for (const station of this.consumption){
      for (const chargings of station.series){
        chargings.name = new Date(chargings.name);
      }
    }
  }

  logout(): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.authService.logout().then(() => {}, error => { this.notifyService.errorHandler(error); });
    }
  }

}
