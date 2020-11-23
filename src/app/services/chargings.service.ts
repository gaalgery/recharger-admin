import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Charging } from '../model/charging';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ChargingsService {

  constructor(private http: HttpClient) { }

  path = 'https://rechargr.herokuapp.com';

  async getChargings(): Promise<Charging[]> {
    return await this.http.get<Charging[]>(this.path + '/chargings').toPromise();
  }

  async deleteCharging(id: number): Promise<void> {
    await this.http.post<Charging>( this.path + '/chargings/' + id + '/delete', {}).toPromise();
  }

  async getUsage(start: string, end: string, stations: string): Promise<[]> {
    const params = new HttpParams().set('start', start).set('end', end).set('stations', stations);
    return await this.http.get<[]>(this.path + '/statistics/usage', {params}).toPromise();
  }

  async getIncome(start: string, end: string, stations: string): Promise<[]> {
    const params = new HttpParams().set('start', start).set('end', end).set('stations', stations);
    return await this.http.get<[]>(this.path + '/statistics/income', {params}).toPromise();
  }

  async getConsumption(start: string, end: string, stations: string): Promise<[]> {
    const params = new HttpParams().set('start', start).set('end', end).set('stations', stations);
    return await this.http.get<[]>(this.path + '/statistics/consumption', {params}).toPromise();
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

  async getChargingsPage(pageNumber: number, pageSize: number): Promise<any> {
    const params = new HttpParams().set('pageNumber', String(pageNumber)).set('pageSize', String(pageSize));
    return await this.http.get<any[]>( this.path + '/chargings/paging', {params}).toPromise();
  }
}
