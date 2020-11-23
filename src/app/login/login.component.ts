import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LogginginSnackbarComponent} from '../loggingin-snackbar/loggingin-snackbar.component';
import {LoggingoutSnackbarComponent} from '../loggingout-snackbar/loggingout-snackbar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  closed = true;
  open = false;

  constructor(private router: Router, private  http: HttpClient, private mainService: AuthService,
              private fb: FormBuilder, private s: MatSnackBar) { }

  async login(): Promise<void>{

    await this.mainService.login(this.loginForm.value.email, this.loginForm.value.password).then(
      async res => {
        if (res){
          this.closed = !this.closed;
          await this.delay(2420);
          this.open = true;
          this.router.navigate([`options`]);
        }
      }
    );
  }

  delay(ms: number): Promise<unknown>
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ngOnInit(): Promise<void> {
      if (this.mainService.loggedIn() && await this.mainService.hasValidToken()) {
        this.router.navigate(['options']);
      }
  }

  p(): void{
    this.s.openFromComponent(LoggingoutSnackbarComponent, {duration: 2000});
  }

}
