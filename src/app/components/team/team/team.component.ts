import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoService } from 'src/app/service/demo.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {


  // team: any[] = [];

  // constructor() { }

  // ngOnInit(): void {
  //   // Retrieve team details from storage or service
  //   this.team = JSON.parse(localStorage.getItem('team') || '[]');
  // }

  // selectedUsers: User[] = [];

  // constructor(private userService: DemoService) { }

  // ngOnInit(): void {
  //   this.selectedUsers = this.userService.getSelectedUsers();
  // }

  team: User[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['team']) {
        this.team = JSON.parse(params['team']);
      }
    });
  }
}
