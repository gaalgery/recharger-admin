import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUser = new FormControl();
  constructor(private router: Router, private users: UsersService, private mainService: AuthService) { }

  ngOnInit(): void {
  }

  async addNewUser(name: string, email: string, password: string, balance: number, admin: boolean): Promise<void>{
    if (!this.mainService.getUpdateStatus()) {
      this.mainService.startUpdate();
      await this.users.addUser(new User(0, name, email, password, balance, admin));
      this.mainService.stopUpdate();
      this.goToPage('users');
    }
  }

  goToPage(pageName: string): void{
    if (!this.mainService.getUpdateStatus()) {
    this.router.navigate([`${pageName}`]);
    }
  }

  logout(): void{
    this.mainService.logout();
  }

}
