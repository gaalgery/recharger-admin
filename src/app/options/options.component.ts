import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../services/notification.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {

  constructor(private router: Router, private notifyService: NotificationService, private authService: AuthService) { }

  goToPage(pageName: string): void{
    this.router.navigate([`${pageName}`]);
  }

  logout(): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.authService.logout().then(() => {}, error => { this.notifyService.errorHandler(error); });
    }
  }
}

