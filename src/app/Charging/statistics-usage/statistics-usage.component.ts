import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChargingsService} from '../../services/chargings.service';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-statistics-usage',
  templateUrl: './statistics-usage.component.html',
  styleUrls: ['./statistics-usage.component.css']
})
export class StatisticsUsageComponent implements OnInit {

  constructor(private router: Router, private notifyService: NotificationService, private authService: AuthService,
              private chargingsService: ChargingsService, private route: ActivatedRoute) { }

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Chargig stations';
  showYAxisLabel = true;
  yAxisLabel = 'Usage';

  usage = [];

  startDate: Date;
  endDate: Date;
  stations: string[];

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.startDate = params.startDate;
        this.endDate = params.endDate;
        this.stations = params.stations;
      });
    this.getUsage();
  }

  async getUsage(): Promise<void>{
    this.notifyService.startUpdate();
    await this.chargingsService.getUsage(new Date(this.startDate), new Date(this.endDate), this.stations == null ? [] : this.stations)
      .then(res => {  this.usage = res; },
        error => { this.notifyService.errorHandler(error); });
    this.notifyService.stopUpdate();
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
