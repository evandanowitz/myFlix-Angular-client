// App's root component file (default entry point to the app). When user launches app, root component is displayed as home page.
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  showLoginMessage: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check if user is logged in by looking for the token in localStorage
    const token = localStorage.getItem('token');

    // If there is no token, redirect to the welcome page
    if (!token) {
      this.showLoginMessage = true; // Set this to true if the user is not logged in
      this.router.navigate(['welcome-page']);
    }
  }
}