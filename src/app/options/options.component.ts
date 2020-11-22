import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {

  constructor(private router: Router, private mainService: AuthService) { }

  goToPage(pageName: string): void{
    this.router.navigate([`${pageName}`]);
  }

  logout(): void{
    this.mainService.logout();
  }
}

