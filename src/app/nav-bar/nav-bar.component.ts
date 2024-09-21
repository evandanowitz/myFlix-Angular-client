import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar', // This defines the custom tag name
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  searchTerm: string = ''; // User's input search term
  isLoggedIn: boolean = false;
  isMenuOpen = false;

  constructor(
    private router: Router) { }

  ngOnInit(): void {
    // Check if user is logged in when the app loads
    this.isLoggedIn = !!localStorage.getItem('token');

    // Listen to route changes to dynamically show/hide the nav bar
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide nav bar if user is on the Welcome page
        if (this.router.url === '/welcome-page') {
          this.isLoggedIn = false;
        } else {
          this.isLoggedIn = !!localStorage.getItem('token');
        }

        // Reset search term when navigating away from the movie-card page
        if (this.router.url !== '/movie-card') {
          this.searchTerm = ''; // Reset the search term
        }
      }
    });
  }

  onSearch(): void {
    // Navigate to the /movie-card route and pass the search term as a query parameter
    this.router.navigate(['/movie-card'], { queryParams: { searchTerm: this.searchTerm } });
  }

  // Method for handling user logout
  logout(): void {
    // Clear localStorage and redirect to the Welcome page
    localStorage.clear(); // Clear local storage to log out the user
    this.isLoggedIn = false;
    this.router.navigate(['/welcome-page']); // Redirect to the Welcome page
  }
}