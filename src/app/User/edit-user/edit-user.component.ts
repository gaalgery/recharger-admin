import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {User} from '../../model/user';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    name: ['', Validators.required],
    balance: [''],
    admin: ['']
  });

  constructor(private active: ActivatedRoute, private users: UsersService, private router: Router,
              private notifyService: NotificationService, private authService: AuthService, private fb: FormBuilder) { }

  public id;
  public user: User = new User(0, '', '', '', 0, false);

  async ngOnInit(): Promise<void> {
    this.notifyService.startUpdate();
    const id = this.active.snapshot.paramMap.get('id');
    this.id = id;

    await this.users.getUser(id)
      .then(res => {  this.user = res;  },
        error => { this.notifyService.errorHandler(error); });
    this.notifyService.stopUpdate();
  }

  goToPage(pageName: string): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  async EditUser(): Promise<void>{
    let hadError = false;
    if (!this.notifyService.getUpdateStatus() && this.userForm.valid) {
      this.notifyService.startUpdate();
      await this.users.editUser(this.id, this.user).then(() => {},
        error => { this.notifyService.errorHandler(error); hadError = true; });
      this.notifyService.stopUpdate();

      if (!hadError) {
        this.goToPage('users');
      }
    }
  }

  logout(): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.authService.logout().then(() => {}, error => { this.notifyService.errorHandler(error); });
    }
  }
}
