// App's root component file (default entry point to the app). When user launches app, root component is displayed as home page.

// import { Component } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   searchTerm: string = ''; // User's input search term

//   constructor(private router: Router) {
//     // Subscribe to route changes
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         // If we navigate away from the Movies page, reset the searchTerm
//         if (this.router.url !== '/movie-card') {
//           this.searchTerm = ''; // Reset the search term
//         }
//       }
//     });
//   }

//   onSearch(): void {
//     // Navigate to the /movie-card route and pass the search term as a query parameter
//     this.router.navigate(['/movie-card'], { queryParams: { searchTerm: this.searchTerm } });
//   }
// }

import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  searchTerm: string = ''; // User's input search term

  constructor(private router: Router) {
    // Subscribe to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // If we navigate away from the Movies page, reset the searchTerm
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
    localStorage.clear(); // Clear local storage to log out the user
    this.router.navigate(['/welcome-page']); // Redirect to the Welcome page
  }
}