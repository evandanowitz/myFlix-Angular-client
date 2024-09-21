// App's root component file (default entry point to the app). When user launches app, root component is displayed as home page.
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check if user is logged in by looking for the token in localStorage
    const token = localStorage.getItem('token');

    // If there is no token, redirect to the welcome page
    if (!token) {
      this.router.navigate(['welcome-page']);
    }
  }

  // Detect if the user is navigating away from the app or closing the tab
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    // Check if the user is navigating away from your domain
    if (!document.referrer.includes('evandanowitz.github.io/myflix-angular-client')) {
      // Clear session only if navigating away from your domain
      localStorage.clear();  // This will log the user out
      console.log('User session cleared on navigation away from the domain');
    }
  }
}