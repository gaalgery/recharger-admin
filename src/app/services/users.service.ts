import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  path = 'https://rechargr.herokuapp.com';

  async getUsers(): Promise<User[]> {
    return await this.http.get<User[]>(this.path + '/users').toPromise();
  }

  async getSelectedUsers(name: string, email: string, role: string, pageNumber: number, pageSize: number): Promise<any> {
    const params = new HttpParams().set('name', name).set('email', email).set('role', role).set('pageNumber', String(pageNumber)).set('pageSize', String(pageSize));
    return await this.http.get<any[]>( this.path + '/users/search', {params}).toPromise();
  }

  async getUser(id: string): Promise<User> {
   return await this.http.get<User>(this.path + '/users/' + id).toPromise();
  }

  async addUser(newUser: User): Promise<void>{
    await this.http.post<any>( this.path + '/users/add', { newUser }).toPromise();
  }

 async editUser(id: string, newUser: User): Promise<void>{
    await this.http.post<User>(this.path + '/users/' + id + '/edit', { newUser }).toPromise();
  }

   async deleteUser(id: number): Promise<void> {
    await this.http.post<User>( this.path + '/users/' + id + '/delete', {}).toPromise();
  }



}
