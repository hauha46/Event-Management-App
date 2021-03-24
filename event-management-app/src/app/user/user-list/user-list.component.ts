import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users : User[];
  searchList: User[];
  searchUser:string = null;
  totalUsers:number;
  itemCount:number;
  page:number;
  maxPage:number;
  constructor(private userService: UserService, private authService : AuthService, private router : Router) { 
    
  }

  ngOnInit(): void {
    if(!this.authService.isAdmin()){
      this.router.navigate(['/accessdenied'])
    }else{
      this.userService.getUsers('',1, 10).subscribe(response =>{
        this.users = response.users;
        this.maxPage = response.maxPage;
        this.totalUsers = response.totalUsers;
        this.page = 1;
        this.itemCount = 10;
      })
    }
  }

  onSearch(){
    this.userService.getUsers(this.searchUser, 1, this.itemCount).subscribe(response =>{
      this.users = response.users;
      this.maxPage = response.maxPage;
      this.totalUsers = response.totalUsers;
      this.page = 1;
    })

  }
  changeItemCount(itemCount: number): void{
    this.itemCount = itemCount;
    this.userService.getUsers(this.searchUser, 1, this.itemCount).subscribe(response =>{
      this.users = response.users;
      this.maxPage = response.maxPage;
      this.totalUsers = response.totalUsers;
      this.page = 1;
    })
  }

  firstPage(): void{
    this.userService.getUsers(this.searchUser, 1, this.itemCount).subscribe(response =>{
      this.users = response.users;
      this.maxPage = response.maxPage;
      this.totalUsers = response.totalUsers;
      this.page = 1;
    })
  }
  prevPage():void{
    this.userService.getUsers(this.searchUser, this.page -1, this.itemCount).subscribe(response =>{
      this.users = response.users;
      this.maxPage = response.maxPage;
      this.totalUsers = response.totalUsers;
      this.page = this.page - 1;
    })
  }
  nextPage():void{
    this.userService.getUsers(this.searchUser, this.page + 1, this.itemCount).subscribe(response =>{
      this.users = response.users;
      this.maxPage = response.maxPage;
      this.totalUsers = response.totalUsers;
      this.page = this.page + 1;
    })
  }
  lastPage():void{
    this.userService.getUsers(this.searchUser, this.maxPage, this.itemCount).subscribe(response =>{
      this.users = response.users;
      this.maxPage = response.maxPage;
      this.totalUsers = response.totalUsers;
      this.page = this.maxPage;
    })
  }

  disabledFirst():boolean{
    return this.page == 1? true : false;
  }

  disabledLast():boolean{
    return this.page == this.maxPage? true : false;
  }
}
