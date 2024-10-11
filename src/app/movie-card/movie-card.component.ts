import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

/**
 * MovieCardComponent is responsible for rendering movie cards.
 * It allows users to view information about each movie, including genre, director, and synopsis.
 * Users can also add or remove movies from their favorites.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  @Input()
  movies: any[] = []; // Holds the array of movies to display.
  filteredMovies: any[] = []; // Stores filtered movies based on search term.
  favoriteMovies: any[] = []; // Stores user's favorite movies.
  searchTerm: string = ''; // Holds user's search term.

  constructor(
    public fetchApiData: FetchApiDataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  /**
   * Initializes the component by checking for passed movies, fetching all movies fetching movies if none are provided, 
   * retrieving user's favorite moves, and handling search term filtering.
   */
  ngOnInit(): void {
    if (this.movies.length > 0) { // Check if movies were passed from the parent component.
      this.filteredMovies = this.movies; // If movies are passed, just use them as filteredMovies.
    } else { // If no movies are passed, default to fetching all movies.
      this.getMovies();
    }

    this.getFavoriteMovies();

    /**
     * Subscribes to query parameters to handle search changes.
     * Updates the searchTerm and filters the movies accordingly.
     */
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'] || ''; // Retrieves the search term from query parameters.
      this.filterMovies(); // Filters the movies based on the search term.
    });
  }

  /**
   * Fetches all movies and stores them in the component.
   * This is called if no movies are passed via teh Input decorator.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filteredMovies = this.movies;
      this.filterMovies();
    });
  }

  /**
   * Fetches user's favorite movies from the backend.
   */
  getFavoriteMovies(): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      console.error('No user found in localStorage');
      return;
    }

    const username = JSON.parse(storedUser).Username;
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies || [];
    });
  }

  /**
   * Checks if a movie is in user's favorites.
   * @param movieId - The ID of the movie to check.
   * @returns True if the movie is a favorite, false otherwise.
   */
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  /**
   * Toggles the favorite status of a movie (add or remove).
   * @param movie - The movie object to toggle.
   */
  toggleFavorite(movie: any): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      console.error('No user found in localStorage');
      return;
    }

    const user = JSON.parse(storedUser);

    if (this.isFavorite(movie._id)) {
      this.fetchApiData.deleteFromFavMovies(user.Username, movie._id).subscribe(() => {
        this.snackBar.open(`${movie.Title} removed from favorites`, 'OK', { duration: 2000 });

        user.FavoriteMovies = user.FavoriteMovies.filter((id: string) => id !== movie._id);
        localStorage.setItem('user', JSON.stringify(user));
        this.getFavoriteMovies();
      });
    } else {
      this.fetchApiData.addToFavMovies(user.Username, movie._id).subscribe(() => {
        this.snackBar.open(`${movie.Title} added to favorites`, 'OK', { duration: 2000 });

        user.FavoriteMovies.push(movie._id);
        localStorage.setItem('user', JSON.stringify(user));
        this.getFavoriteMovies();
      });
    }
  }

  /**
   * Filters movies based on the search term entered by user.
   */
  filterMovies(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredMovies = this.movies;
    } else {
      this.filteredMovies = this.movies.filter(movie =>
        movie.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  /**
   * Opens a dialog to display the genre information for a movie.
   * @param genre - The name of the genre to display.
   */
  openGenreDialog(genre: string): void {
    this.fetchApiData.getGenre(genre).subscribe((response: any) => {
      this.dialog.open(DialogComponent, {
        data: {
          title: `Genre: ${genre}`,
          content: response.Description
        }
      });
    });
  }

  /**
   * Opens a dialog to display the director information for a movie.
   * @param director - The name of the director to display.
   */
  openDirectorDialog(director: string): void {
    this.fetchApiData.getDirector(director).subscribe((response: any) => {
      this.dialog.open(DialogComponent, {
        data: {
          title: `Director: ${director}`,
          content: response.Bio
        }
      });
    });
  }

  /**
   * Opens a dialog to display the synopsis for a movie.
   * @param movie - The movie object to display.
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: `Synopsis: ${movie.Title}`,
        content: movie.Description
      }
    });
  }
}