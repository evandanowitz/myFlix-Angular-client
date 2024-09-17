import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service'; // Your service for fetching movie data

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  movies: any[] = []; // List of all movies
  filteredMovies: any[] = []; // Filtered list of movies based on the search
  searchTerm: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    private route: ActivatedRoute // Inject ActivatedRoute to get query parameters
  ) { }

  // getMovies function is called in the NgOnInit lifecycle hook. ngOnInit() is called when Angular is done creating the component.
  ngOnInit(): void {
    this.getMovies(); // Fetch the movies when the component is initialized

    // Get the search term from the query parameters
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'] || ''; // Default to empty string if no search term
      this.filterMovies();
    });
  }

  // The getMovies() method fetches the movies when the component is initialized and displays them all by default in filteredMovies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp; // Store the full movie list
      this.filteredMovies = this.movies; // Initially, display all movies
      this.filterMovies(); // Immediately apply the filter
    });
  }

  // Filter movies based on the search term
  filterMovies(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredMovies = this.movies; // If search is empty, show all movies
    } else {
      this.filteredMovies = this.movies.filter(movie =>
        movie.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}

// Everything else you need is contained in the template for this component. This component is designed for rendering.