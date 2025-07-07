import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  searchText: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
    console.log('✅ UserListComponent loaded');
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res.users;
    });
  }

  onSearchChange(): void {
    const keyword = this.searchText.toLowerCase();
    this.userService.getUsers().subscribe((res: any) => {
      const filtered = res.users.filter((u: any) =>
        u.firstName.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword)
      );
      this.users = filtered.sort((a: any, b: any) => a.firstName.localeCompare(b.firstName));
    });
  }

  openModal(user: any) {
    this.selectedUser = user;
  }

  closeModal() {
    this.selectedUser = null;
  }

  goToEdit(user: any) {
    this.router.navigate(['/edit-user', user.id]);
  }

  isAscending: boolean = true;

  sortUsers(): void {
    this.users.sort((a: any, b: any) => {
      const comparison = a.firstName.localeCompare(b.firstName);
      return this.isAscending ? comparison : -comparison;
    });
  }

  onAddUser(): void {
    this.router.navigate(['/add-user']);
  }


}

