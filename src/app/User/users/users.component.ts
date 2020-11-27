import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {User} from '../../model/user';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  userSearch = this.fb.group({
    email: [''],
    name: [''],
    admin: ['']
  });


  public numberOfUsers = 0;
  public users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'balance', 'admin', 'options'];
  usersData = new MatTableDataSource(this.users);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public usersService: UsersService, private router: Router, private fb: FormBuilder,
              private notifyService: NotificationService, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
      this.usersData = new MatTableDataSource(this.users);
      this.usersData.paginator = this.paginator;
  }

 async refreshDataSource(): Promise<void> {
   if (!this.notifyService.getUpdateStatus()) {
     this.notifyService.startUpdate();

     await this.usersService.getSelectedUsers(this.userSearch.value.name,
       this.userSearch.value.email, this.userSearch.value.admin, this.paginator.pageIndex, this.paginator.pageSize).then(
       res => {
         this.numberOfUsers = res.totalElements;
         this.usersData.data = res.content;
       },
       error => { this.notifyService.errorHandler(error); }
     );

     this.notifyService.stopUpdate();
   }
  }

  ngAfterViewInit(): void {
      setTimeout(() => {
        this.paginator.page.subscribe(() => {
          this.refreshDataSource();
        });
        this.refreshDataSource();
      });
  }

  goToPage(pageName: string): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  editUser(ID: number): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.router.navigate(['/edit-user', ID]);
    }
  }

  async deleteUser(ID: number): Promise<void>{
    let hadError = false;
    if (!this.notifyService.getUpdateStatus()) {
      this.notifyService.startUpdate();
      await this.usersService.deleteUser(ID).then(async () => {},
        error => { this.notifyService.errorHandler(error); hadError = true; });
      this.notifyService.stopUpdate();

      if (!hadError) {
        await this.refreshDataSource();
      }
    }
  }

  logout(): void{
    if (!this.notifyService.getUpdateStatus()) {
      this.authService.logout().then(() => {}, error => { this.notifyService.errorHandler(error); });
    }
  }
}
