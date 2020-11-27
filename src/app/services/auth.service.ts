import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NotificationService} from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path = 'https://rechargr.herokuapp.com';

  constructor(private http: HttpClient, private router: Router, private notify: NotificationService) { }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  async login(authemail: string, authpassword: string): Promise<boolean>{

    let authorized = false;
    await this.http.post<any>(  this.path + '/adminlogin/', {email: authemail, password: authpassword}).toPromise().then(
      res => {
      localStorage.setItem('token', res.token);
      authorized = true;
      },
      async error => {
        this.notify.errorHandler(error);
      }
    );
    return authorized;
  }

  async logout(): Promise<void>{
    this.notify.startLogout();
    await this.http.post<any>( this.path + '/logout', { token: this.getToken() }).toPromise();
    localStorage.removeItem('token');
    await this.router.navigate([`login`]);
    this.notify.stopLogout();
  }

  async hasValidToken(): Promise<boolean> {
    this.notify.startUpdate();
    let valid = false;
    await this.http.post<any>(  this.path + '/auth', {token: this.getToken()} ).toPromise().then( res => valid = res.authed );
    this.notify.stopUpdate();
    return valid;
  }
}

