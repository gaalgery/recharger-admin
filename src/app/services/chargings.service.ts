import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Charging} from '../model/charging';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ChargingsService {

  constructor(private http: HttpClient, private notify: NotificationService) { }

  path = 'https://rechargr.herokuapp.com';

  async getChargings(): Promise<Charging[]> {
    return await this.http.get<Charging[]>(this.path + '/chargings').toPromise();
  }

  async deleteCharging(id: number): Promise<void> {
    await this.http.post<Charging>( this.path + '/chargings/' + id + '/delete', {}).toPromise();
  }

  async getSelectedChargings(start: Date, end: Date, stationsSelected: string[], pageN: number, pageS: number): Promise<any> {
    return await this.http.post<any[]>( this.path + '/chargings/search', {
      startDate: start,
      endDate: end,
      stations: stationsSelected,
      pageNumber: pageN,
      pageSize: pageS
    }).toPromise();
  }

  async getConsumption(start: Date, end: Date, stationsSelected: string[]): Promise<any> {
    return await this.http.post<any>( this.path + '/statistics/consumption', {
      startDate: start,
      endDate: end,
      stations: stationsSelected
    }).toPromise();
  }

  async getUsage(start: Date, end: Date, stationsSelected: string[]): Promise<any> {
    return await this.http.post<any>( this.path + '/statistics/usage', {
      startDate: start,
      endDate: end,
      stations: stationsSelected,
    }).toPromise();
  }

  async getIncome(start: Date, end: Date, stationsSelected: string[]): Promise<any> {
    return await this.http.post<any>( this.path + '/statistics/income', {
      startDate: start,
      endDate: end,
      stations: stationsSelected,
    }).toPromise();
  }
}
