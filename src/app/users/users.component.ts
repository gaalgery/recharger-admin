import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
// @ts-ignore
import { MatSort } from '@angular/material';
import { AuthService } from '../services/auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  userSearch = new FormGroup(
    {
      userName: new FormControl(''),
      userEmail: new FormControl(''),
      userRole: new FormControl(''),
    }
  );


  public numberOfUsers = 0;
  public users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'balance', 'admin', 'options'];
  usersData = new MatTableDataSource(this.users);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public usersService: UsersService, private router: Router, private mainService: AuthService) { }

  async ngOnInit(): Promise<void> {
      this.usersData = new MatTableDataSource(this.users);
      this.usersData.paginator = this.paginator;
  }

 async refreshDataSource(): Promise<void> {
   if (!this.mainService.getUpdateStatus()) {
     this.mainService.startUpdate();

     await this.usersService.getSelectedUsers(this.userSearch.value.userName,
       this.userSearch.value.userEmail, this.userSearch.value.userRole, this.paginator.pageIndex, this.paginator.pageSize).then(
       res => {
         this.numberOfUsers = res.totalElements;
         this.usersData.data = res.content;
       }
     );

     this.mainService.stopUpdate();
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

  async getUsers(): Promise<void>{
    this.mainService.startUpdate();
    await this.usersService.getUsers()
      .then(res => {  this.users = res; });
    this.mainService.stopUpdate();
  }

  goToPage(pageName: string): void{
    if (!this.mainService.getUpdateStatus()) {
      this.router.navigate([`${pageName}`]);
    }
  }

  editUser(ID: number): void{
    if (!this.mainService.getUpdateStatus()) {
      this.router.navigate(['/edit-user', ID]);
    }
  }

  async deleteUser(ID: number): Promise<void>{
    if (!this.mainService.getUpdateStatus()) {
      this.mainService.startUpdate();
      await this.usersService.deleteUser(ID);
      this.mainService.stopUpdate();
      await this.refreshDataSource();
    }
  }

  logout(): void{
    this.mainService.logout();
  }
}
