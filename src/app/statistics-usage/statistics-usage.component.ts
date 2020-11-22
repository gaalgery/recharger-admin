import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ChargingsService } from '../services/chargings.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-statistics-usage',
  templateUrl: './statistics-usage.component.html',
  styleUrls: ['./statistics-usage.component.css']
})
export class StatisticsUsageComponent implements OnInit {

  constructor(private router: Router, private mainService: AuthService,
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

  startDate: string;
  endDate: string;
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
    this.mainService.startUpdate();
    await this.chargingsService.getUsage(this.startDate, this.endDate, String(this.stations))
      .then(res => {  this.usage = res; console.log(res); });
    this.mainService.stopUpdate();
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
