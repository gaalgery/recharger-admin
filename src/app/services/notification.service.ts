import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UpdatingSnackbarComponent} from '../snackbars/updating-snackbar/updating-snackbar.component';
import {LogginginSnackbarComponent} from '../snackbars/loggingin-snackbar/loggingin-snackbar.component';
import {LoggingoutSnackbarComponent} from '../snackbars/loggingout-snackbar/loggingout-snackbar.component';
import {TokenExpiredSnackbarComponent} from '../snackbars/token-expired-snackbar/token-expired-snackbar.component';
import {LoginFailedSnackbarComponent} from '../snackbars/login-failed-snackbar/login-failed-snackbar.component';
import {CustomSnackbarComponent} from '../snackbars/custom-snackbar/custom-snackbar.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  updating = false;
  updatingSnack = null;
  loginSnack = null;
  logoutSnack = null;
  path = 'https://rechargr.herokuapp.com';

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar) { }



  startUpdate(): void{
    this.updating = true;
    this.updatingSnack = this.snackbar.openFromComponent(UpdatingSnackbarComponent);
  }

  stopUpdate(): void{
    this.updating = false;
    if (this.updatingSnack != null) {
        this.updatingSnack.dismiss();
    }
  }

  getUpdateStatus(): boolean {
    return this.updating;
  }

  startLogin(): void{
    this.loginSnack = this.snackbar.openFromComponent(LogginginSnackbarComponent);
  }

  stopLogin(): void{
    if (this.loginSnack != null) {
      this.loginSnack.dismiss();
    }
  }

  startLogout(): void{
    this.updating = true;
    this.logoutSnack = this.snackbar.openFromComponent(LoggingoutSnackbarComponent);
  }

  public stopLogout(): void{
    this.updating = false;
    if (this.logoutSnack != null) {
      this.logoutSnack.dismiss();
    }
  }

  InvalidToken(): void{
    this.snackbar.openFromComponent(TokenExpiredSnackbarComponent, { duration: 2000 });
  }

  async LoginFailed(): Promise<void>{
    this.snackbar.openFromComponent(LoginFailedSnackbarComponent, { duration: 3000});
  }

  unpredictedError(error: any): void{
    this.snackbar.openFromComponent(CustomSnackbarComponent, {data: error.status, duration: 3000});
  }

  fullCustom(text: string): void{
    this.snackbar.open(text, 'Dismiss', {duration: 2500});
  }

  public errorHandler(error: any): void {

    this.stopUpdate();

    if (error instanceof HttpErrorResponse){
      if (error.status === 401) {
        this.LoginFailed();
      }
      else {
        this.unpredictedError(error);
      }

    }
    else{
      console.log(error);
    }
  }
}
