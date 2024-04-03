import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { User } from '../user';
@Injectable({
  providedIn: 'root'
})
export class DemoService {
  // constructor(private http: HttpClient) { }

  // getUsers(): Observable<any> {
  //   return this.http.get<any>('assets/users.json');
  // }

  private apiUrl = 'assets/users.json';
  private users: User[] = [];
  private selectedUsers: User[] = [];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    if (this.users.length > 0) {
      return of(this.users);
    } else {
      return this.http.get<User[]>(this.apiUrl)
        .pipe(
          map((users: User[]) => {
            this.users = users;
            return this.users;
          })
        );
    }
  }

  getSelectedUsers(): User[] {
    return this.selectedUsers;
  }

  addToTeam(user: User): void {
    if (!this.selectedUsers.some(u => u.id === user.id)) {
      this.selectedUsers.push(user);
    }
  }
}
