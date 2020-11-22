import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private mainservice: AuthService, private router: Router) {
  }

  async canActivate(): Promise<boolean> {
    if (this.mainservice.loggedIn() && await this.mainservice.hasValidToken()){
      return true;
    }
    else {
      console.log('NEM MEHET TOVABB MERT NEM VALID A TOKEN');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
