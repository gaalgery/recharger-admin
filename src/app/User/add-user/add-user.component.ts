import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {User} from '../../model/user';
import {NotificationService} from '../../services/notification.service';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    name: ['', Validators.required],
    balance: [''],
    admin: ['']
  });

  constructor(private router: Router, private users: UsersService, private fb: FormBuilder,
              private notifyService: NotificationService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async addNewUser(): Promise<void>{
    let hadError = false;
    if (!this.notifyService.getUpdateStatus()) {

      if (this.userForm.valid){
        this.notifyService.startUpdate();
        await this.users.addUser(new User(0, this.userForm.value.name, this.userForm.value.email,
          this.userForm.value.password, this.userForm.value.balance, this.userForm.value.admin)).then(() => {},
          error => { this.notifyService.errorHandler(error); hadError = true; });
        this.notifyService.stopUpdate();
      }


      if (!hadError) {
        this.goToPage('users');
      }
    }
  }

  goToPage(pageName: string): void{
    if (!this.notifyService.getUpdateStatus()) {
    this.router.navigate([`${pageName}`]);
    }
  }

  logout(): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.authService.logout().then(() => {}, error => { this.notifyService.errorHandler(error); });
    }
  }

}
