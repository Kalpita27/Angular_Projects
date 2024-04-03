import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemoService } from 'src/app/service/demo.service';
import { User } from 'src/app/user';

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{


// users: any[] = [];
// displayedUsers: any[] = [];
// domains: string[] = [];
// team: any[] = [];
// currentPage: number = 1;
// totalPages: number = 0;
// searchText: string = '';
// selectedDomain: string = '';
// selectedGender: string = '';
// selectedavailable: boolean = false;

// constructor(private http: HttpClient) { }

// ngOnInit(): void {
//   this.http.get<any[]>('assets/users.json').subscribe(data => {
//     this.users = data;
//     this.displayedUsers = this.users.slice(0, 20); // Initial display 20 users
//     this.totalPages = Math.ceil(this.users.length / 20);
//     this.getDomains();
//   });
// }

// getDomains(): void {
//   this.domains = this.users.map(user => user.domain)
//                             .filter((value, index, self) => self.indexOf(value) === index);
// }

// searchUsers(): void {
//   this.currentPage = 1;
//   this.displayedUsers = this.users.filter(user =>
//     user.first_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
//     user.last_name.toLowerCase().includes(this.searchText.toLowerCase())
//   ).slice(0, 20);
// }

// filterUsers(): void {
//   this.currentPage = 1;
//   this.displayedUsers = this.users.filter(user =>
//     (this.selectedDomain ? user.domain === this.selectedDomain : true) &&
//     (this.selectedGender ? user.gender === this.selectedGender : true) &&
//     (this.selectedavailable ? user.available : true)
//   ).slice(0, 20);
// }

// prevPage(): void {
//   if (this.currentPage > 1) {
//     this.currentPage--;
//     this.displayedUsers = this.users.slice((this.currentPage - 1) * 20, this.currentPage * 20);
//   }
// }

// nextPage(): void {
//   if (this.currentPage < this.totalPages) {
//     this.currentPage++;
//     this.displayedUsers = this.users.slice((this.currentPage - 1) * 20, this.currentPage * 20);
//   }
// }

// addToTeam(user: any): void {
//   if (!this.isUserInTeam(user.id) && !this.isDomainInTeam(user.domain) && user.available) {
//     this.team.push(user);
//   }
// }

// isUserInTeam(id: number): boolean {
//   return this.team.some(member => member.id === id);
// }

// isDomainInTeam(domain: string): boolean {
//   return this.team.some(member => member.domain === domain);
// }

users: User[] = [];
  filteredUsers: User[] = [];
  pagedUsers: User[] = [];
  searchText: string = '';
  selectedDomain: string = '';
  selectedGender: string = '';
  selectedavailable: boolean = false;
  domains: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 1;
  team: User[] = [];

  constructor(private userService: DemoService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = this.users;
      this.applyFilters();
      this.extractDomains();
    });
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user =>
      (this.selectedDomain ? user.domain === this.selectedDomain : true) &&
      (this.selectedGender ? user.gender === this.selectedGender : true) &&
      (this.selectedavailable ? user.available : true) &&
      (user.first_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.last_name.toLowerCase().includes(this.searchText.toLowerCase()))
    );
    this.calculateTotalPages();
    this.currentPage = 1;
    this.setPagedUsers();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPagedUsers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPagedUsers();
    }
  }

  setPagedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  addToTeam(user: User): void {
    user.selected = true;
    this.team.push(user);
  }

  removeFromTeam(user: User): void {
    user.selected = false;
    this.team = this.team.filter(member => member.id !== user.id);
  }

  isUserSelectable(user: User): boolean {
    // Check if user's domain and availability are unique in the team
    return !this.team.some(member => member.domain === user.domain && member.available === user.available);
  }

  extractDomains(): void {
    this.domains = Array.from(new Set(this.users.map(user => user.domain)));
  }

  createTeam(): void {
    // Send the team data to the TeamComponent using query params
    this.router.navigate(['/team'], { queryParams: { team: JSON.stringify(this.team) } });
  }

}
