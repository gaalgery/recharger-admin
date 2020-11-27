import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChargingsService} from '../../services/chargings.service';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth.service';

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
    this.getIncome();
  }

  async getIncome(): Promise<void>{
    this.notifyService.startUpdate();
    await this.chargingsService.getIncome(new Date(this.startDate), new Date(this.endDate), this.stations == null ? [] : this.stations)
       .then(res => {  this.income = res; this.notifyService.stopUpdate(); },
         error => { this.notifyService.errorHandler(error); });
  }

  goToPage(pageName: string): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  format(data): string {
    return data + ' HFt';
  }

  logout(): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.authService.logout().then(() => {}, error => { this.notifyService.errorHandler(error); });
    }
  }
}
