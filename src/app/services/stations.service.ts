import { Injectable } from '@angular/core';
import { Station } from '../model/station';
import {HttpClient, HttpParams} from '@angular/common/http';
import { ChargingHead } from '../model/chargingHead';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  constructor(private http: HttpClient) { }

  path = 'https://rechargr.herokuapp.com';

  async getStations(): Promise<Station[]> {
    return await this.http.get<Station[]>(this.path + '/stations').toPromise();
  }

  async getStation(id: string): Promise<Station> {
    return await this.http.get<Station>(this.path + '/stations/' + id).toPromise();
  }

  async addStation(newStation: Station): Promise<void>{
    return await this.http.post<any>( this.path + '/stations/add', { newStation }).toPromise();
  }

  async deleteStation(id: number): Promise<void> {
    await this.http.post<Station>( this.path + '/stations/' + id + '/delete', {}).toPromise();
  }

  async editStation(id: string, newStation: Station): Promise<void>{
    await this.http.post<Station>(this.path + '/stations/' + id + '/edit', { newStation }).toPromise();
  }

  async geSelectedStations(address: string, state: string, phone: string, pageNumber: number, pageSize: number): Promise<any> {
    const params = new HttpParams().set('address', address).set('state', state).set('phone', phone)
      .set('pageNumber', String(pageNumber)).set('pageSize', String(pageSize));
    return await this.http.get<any[]>( this.path + '/stations/search', {params}).toPromise();
  }

  async getChargers(id: string): Promise<ChargingHead[]> {
    return await this.http.get<ChargingHead[]>(this.path + '/stations/' + id + '/chargingheads').toPromise();
  }

  async addCharger(newChargingHead: ChargingHead): Promise<void>{
    return await this.http.post<any>( this.path + '/chargingheads/add', { newChargingHead }).toPromise();
  }

  async deleteChargingHead(id: number): Promise<void> {
    await this.http.post<Station>( this.path + '/chargingheads/' + id + '/delete', {}).toPromise();
  }

  async editChargingHead(id: number, newChargingHead: ChargingHead): Promise<void>{
    await this.http.post<Station>(this.path + '/chargingheads/' + String(id) + '/edit', { newChargingHead }).toPromise();
  }

}
