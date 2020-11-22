import {Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private active: ActivatedRoute, private users: UsersService, private router: Router, private mainService: AuthService) { }

  public id;
  public user: User = new User(0, '', '', '', 0, false);

  async ngOnInit(): Promise<void> {
    this.mainService.startUpdate();
    const id = this.active.snapshot.paramMap.get('id');
    this.id = id;

    await this.users.getUser(id)
      .then(res => {  this.user = res;  });
    this.mainService.stopUpdate();
  }

  goToPage(pageName: string): void{
    if (!this.mainService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  async EditUser(name: string, email: string, password: string, balance: number, admin: boolean): Promise<void>{
    if (!this.mainService.getUpdateStatus()) {
      this.mainService.startUpdate();
      await this.users.editUser(this.id, new User(0, name, email, password, balance, admin));
      this.mainService.stopUpdate();
    }
  }

  logout(): void{
    this.mainService.logout();
  }
}
