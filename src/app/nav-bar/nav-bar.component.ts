import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  searchTerm: string = '';
  isLoggedIn: boolean = false;
  isMenuOpen = false;

  constructor(
    private router: Router) { }

  ngOnInit(): void {
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
        if (this.router.url !== '/movie-card') {
          this.searchTerm = '';
        }
      }
    });
  }

  onSearch(): void {
    this.router.navigate(['/movie-card'], { queryParams: { searchTerm: this.searchTerm } });
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/welcome-page']);
  }
}