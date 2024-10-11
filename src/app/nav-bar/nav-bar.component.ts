import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

/**
 * NavBarComponent displays the navigation bar with links to Movies, Profile, and a Logout button.
 * It also includes a search form to search for movies by title.
 */
@Component({
  selector: 'app-nav-bar', // Defines the custom tag (element) name.
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  searchTerm: string = ''; // Holds user's search input.
  isLoggedIn: boolean = false; // Tracks if user is logged in.
  isMenuOpen = false; // Tracks if mobile menu is open.

  constructor(private router: Router) { }

  /**
   * Lifecycle hook that runs when the component initializes.
   * It checks if the user is logged in and listens for route changes to control navigation behavior.
   */
  ngOnInit(): void {
    // Check if user is logged in when app loads.
    this.isLoggedIn = !!localStorage.getItem('token');

    // Listen to route changes to dynamically show/hide the nav bar.
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide nav bar if user is on the Welcome page
        if (this.router.url === '/welcome-page') {
          this.isLoggedIn = false;
        } else {
          this.isLoggedIn = !!localStorage.getItem('token');
        }
        if (this.router.url !== '/movie-card') {
          this.searchTerm = ''; // Reset search term when navigating away from the movie card page.
        }
      }
    });
  }

  /**
   * Handles search submission by navigating to the movie card route with the search term as a query parameter.
   */
  onSearch(): void {
    this.router.navigate(['/movie-card'], { queryParams: { searchTerm: this.searchTerm } });
  }

  /**
   * Logs user out by clearing the token from localStorage and navigating to the Welcome page.
   */
  logout(): void {
    localStorage.clear(); // Clear local storage to log out user.
    this.isLoggedIn = false;
    this.router.navigate(['/welcome-page']); // Redirect to the Welcome page.
  }
}