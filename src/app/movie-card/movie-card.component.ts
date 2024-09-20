import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service'; // Your service for fetching movie data
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  @Input()
  movies: any[] = [];
  filteredMovies: any[] = [];
  favoriteMovies: any[] = [];
  searchTerm: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Check if movies were passed from the parent component
    if (this.movies.length > 0) {
      // If movies are passed, just use them as filteredMovies
      this.filteredMovies = this.movies;
    } else {
      // If no movies are passed, default to fetching all movies
      this.getMovies();
    }

    // Get user's favorite movies
    this.getFavoriteMovies();

    // Handle search functionality
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'] || '';
      this.filterMovies();
    });
  }

  // Fetch all movies (called if no movies are passed via @Input)
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filteredMovies = this.movies;
      this.filterMovies();
    });
  }

  // Fetch user's favorite movies
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

  // Check if a movie is in the user's favorites
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  // Toggle favorite status (add/remove)
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

  // Filter movies based on the search term
  filterMovies(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredMovies = this.movies;
    } else {
      this.filteredMovies = this.movies.filter(movie =>
        movie.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  openGenreDialog(genre: string): void {
    this.fetchApiData.getGenre(genre).subscribe((response: any) => {
      this.dialog.open(DialogComponent, {
        data: {
          // title: `Genre: ${response.Name}`,
          title: `Genre: ${genre}`,
          content: response.Description
        }
      });
    });
  }
  openDirectorDialog(director: string): void {
    this.fetchApiData.getDirector(director).subscribe((response: any) => {
      this.dialog.open(DialogComponent, {
        data: {
          // title: `Director: ${response.Name}`,
          title: `Director: ${director}`,
          content: response.Bio
        }
      });
    });
  }
  openSynopsisDialog(movie: any): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: `Synopsis: ${movie.Title}`,
        content: movie.Description
      }
    });
  }
}