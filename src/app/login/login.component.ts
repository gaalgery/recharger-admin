import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../services/notification.service';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  closed = true;
  open = false;

  constructor(private router: Router, private  http: HttpClient, private notifyService: NotificationService,
              private authService: AuthService, private fb: FormBuilder, private s: MatSnackBar) { }


  async ngOnInit(): Promise<void> {
    if (this.authService.loggedIn()) {
      if (await this.authService.hasValidToken()) {
        this.router.navigate(['options']);
      }
      else {
        this.notifyService.InvalidToken();
      }
    }
  }

  async login(): Promise<void>{
    if (this.loginForm.valid && !this.notifyService.getUpdateStatus()){
      this.notifyService.startLogin();
      await this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then(
        async res => {
          if (res){
            this.closed = !this.closed;
            await this.delay(2420);
            this.open = true;
            this.notifyService.stopLogin();
            this.router.navigate([`options`]);
          }
        }
      );
    }
  }

  delay(ms: number): Promise<unknown>
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  p(): void{
    this.s.open('dfg');
  }

}
