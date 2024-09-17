import { Component, OnInit } from '@angular/core';
// import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: any = {}; // Store user info, including favorite movies

  constructor() { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  // Fetch user info from the API
  getUserInfo(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      console.log('User data from localStorage:', this.user);
    } else {
      console.error('No user data found in localStorage.');
    }
  }
}