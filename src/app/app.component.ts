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
    const token = localStorage.getItem('token');

    // If no token, redirect to welcome-page
    if (!token) {
      this.router.navigate(['welcome-page']);
    }
  }

  // Detect if user is navigating away from app or closing tab
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    // Check if user is navigating away from domain
    if (!document.referrer.includes('evandanowitz.github.io/myflix-angular-client')) {
      // Clear session if navigating away from domain
      localStorage.clear();
      console.log('User session cleared on navigation away from the domain');
    }
  }
}