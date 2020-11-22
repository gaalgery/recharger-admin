import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormControl();

  constructor(private router: Router, private  http: HttpClient, private mainService: AuthService) { }
  response: any = null;

  async ngOnInit(): Promise<void> {
      if (this.mainService.loggedIn() && await this.mainService.hasValidToken()) {
        this.router.navigate(['options']);
      }
  }
  async login(authemail: string, authpassword: string): Promise<void>{
    await this.mainService.login(authemail, authpassword);
  }

}
