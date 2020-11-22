import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ChargingsService} from '../services/chargings.service';
import { ActivatedRoute } from '@angular/router';

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

  startDate: string;
  endDate: string;
  stations: string[];

  constructor(private router: Router, private mainService: AuthService,
              private chargingsService: ChargingsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.consumption = [
      {
        name: 'Germany',
        series: [
          {
            name: '1990',
            value: 1
          },
          {
            name: '2010',
            value: 2
          },
          {
            name: '2011',
            value: 1
          }
        ]
      },

      {
        name: 'USA',
        series: [
          {
            name: '1990',
            value: 1
          },
          {
            name: '2010',
            value: 1
          },
          {
            name: '2011',
            value: 3
          }
        ]
      },

      {
        name: 'France',
        series: [
          {
            name: '1990',
            value: 1
          },
          {
            name: '2010',
            value: 1
          },
          {
            name: '2011',
            value: 2
          }
        ]
      },
      {
        name: 'UK',
        series: [
          {
            name: '1990',
            value: 1
          },
          {
            name: '2010',
            value: 1
          }
        ]
      },
      {
        name: 'UKsadasd',
        series: [
          {
            name: '1990',
            value: 1
          },
          {
            name: '2011',
            value: 1
          }
        ]
      },
      {
        name: 'USAB',
        series: [
          {
            name: '1990',
            value: 1
          },
          {
            name: '2010',
            value: 1
          },
          {
            name: '2011',
            value: 1
          }
        ]
      }
    ];
    this.route.queryParams
      .subscribe(params => {
        this.startDate = params.startDate;
        this.endDate = params.endDate;
        this.stations = params.stations;
      });
    this.getConsumption();
  }


  goToPage(pageName: string): void{
    if (!this.mainService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  async getConsumption(): Promise<void>{
    this.mainService.startUpdate();
    await this.chargingsService.getConsumption(this.startDate, this.endDate, String(this.stations))
      .then(res => {  this.consumption = res; });

    this.mainService.stopUpdate();
  }

  logout(): void{
    this.mainService.logout();
  }

}
