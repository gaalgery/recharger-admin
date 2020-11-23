import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdatingSnackbarComponent } from '../updating-snackbar/updating-snackbar.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  updating = false;
  path = 'https://rechargr.herokuapp.com';

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar) { }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  async login(authemail: string, authpassword: string): Promise<boolean>{
    this.startUpdate();
    let authorized = false;
    await this.http.post<any>(  this.path + '/adminlogin/', {email: authemail, password: authpassword}).toPromise().then(res => {
      localStorage.setItem('token', res.token);
      authorized = true;
    });
    return authorized;
    this.stopUpdate();
  }

  async logout(): Promise<void>{
    this.startUpdate();

    await this.http.post<any>( this.path + '/logout', { token: this.getToken() }).toPromise();
    localStorage.removeItem('token');
    this.router.navigate([`login`]);
    this.stopUpdate();
  }

  startUpdate(): void{
    this.updating = true;
    this.snackbar.openFromComponent(UpdatingSnackbarComponent);
  }

  stopUpdate(): void{
    this.updating = false;
    this.snackbar.dismiss();
  }

  getUpdateStatus(): boolean {
    return this.updating;
  }

  async hasValidToken(): Promise<boolean> {
    this.startUpdate();
    let valid = false;
    await this.http.post<any>(  this.path + '/auth', {token: this.getToken()} ).toPromise().then( res => valid = res.authed );
    this.stopUpdate();
    return valid;
  }
}
