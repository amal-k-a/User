import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  searchText: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
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

  onAddUser(): void {
    this.router.navigate(['/add-user']);
  }
}
