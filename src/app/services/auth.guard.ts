import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {NotificationService} from './notification.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private notifyService: NotificationService, private authService: AuthService, private router: Router) {
  }

  async canActivate(): Promise<boolean> {
    if (this.authService.loggedIn() && await this.authService.hasValidToken()){
      return true;
    }
    else {
      this.notifyService.InvalidToken();
      await this.router.navigate(['/login']);
      return false;
    }
  }
}
