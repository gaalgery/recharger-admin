import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ChargingsService } from '../services/chargings.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-statistics-income',
  templateUrl: './statistics-income.component.html',
  styleUrls: ['./statistics-income.component.css']
})
export class StatisticsIncomeComponent implements OnInit {

  income = [];
  legend = true;
  legendPosition = 'right';
  showGridLines = true;

  startDate: string;
  endDate: string;
  stations: string[];

  constructor(private router: Router, private mainService: AuthService,
              private chargingsService: ChargingsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.startDate = params.startDate;
        this.endDate = params.endDate;
        this.stations = params.stations;
      });
    this.getIncome();
  }

  async getIncome(): Promise<void>{
    this.mainService.startUpdate();
    await this.chargingsService.getIncome(this.startDate, this.endDate, String(this.stations))
       .then(res => {  this.income = res; });

    this.mainService.stopUpdate();
  }

  goToPage(pageName: string): void{
    if (!this.mainService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  format(data): string {
    return data + ' HFt';
  }

  logout(): void{
    this.mainService.logout();
  }
}
