// App's root component (default entry point to app). When app is launched, root component is displayed as home page.

import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'myFlix-Angular-client';

  constructor(private router: Router) { }

  /**
   * Lifecycle hook that runs when the component is initialized.
   * Checks if the user is logged in by verifying the presence of a token in localStorage.
   * If no token is found, the user is redirected to the welcome page.
   */
  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['welcome-page']);
    }
  }

  /**
   * Detects if user is navigating away from the app or closing the tab.
   * Clears session by removing localStorage if user navigates away from domain.
   * @param event - The navigation event.
   */
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    if (!document.referrer.includes('evandanowitz.github.io/myflix-angular-client')) {
      localStorage.clear(); // Logs user out by clearing localStorage
      console.log('User session cleared on navigation away from the domain');
    }
  }
}