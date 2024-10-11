import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

/**
 * User Profile component allows users to view their details, update their info, and manage favorite movies.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  updatedUser: any = {};
  favoriteMovies: any[] = [];
  movies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  /**
   * Fetches user info and all movies on component initialization.
   */
  ngOnInit(): void {
    this.fetchAllMovies();
    this.getUserInfo();
  }

  /**
   * Fetches all movies and stores them in the 'movies' array.
   */
  fetchAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any) => {
      this.movies = movies;
      this.loadFavoriteMovies();
    })
  }

  /**
   * Retrieves user data from localStorage and updated the 'user' object.
   */
  getUserInfo(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('User info found in localStorage:', storedUser);
      this.user = JSON.parse(storedUser);
      this.loadFavoriteMovies(); // Load favorite movies after getting user info
    } else {
      console.error('No user data found in localStorage.');
    }
  }

  /**
   * Filters favorite movies based on user's favorite movie IDs.
   */
  loadFavoriteMovies(): void {
    const favoriteMovieIds = this.user.FavoriteMovies || [];
    this.favoriteMovies = this.movies.filter((movie: any) => favoriteMovieIds.includes(movie._id));
    console.log('Filtered favoriteMovies:', this.favoriteMovies);
  }

  /**
   * Opens a dialog to display genre information for the selected movie.
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
   * Opens a dialog to display director information for the selected movie.
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
   * Opens a dialog to display the synopsis for the selected movie.
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: `Synopsis: ${movie.Title}`,
        content: movie.Description
      }
    });
  }

  /**
   * Toggles the favorite status of a movie for user.
   * Adds or removes the movie from user's favorites list.
   */
  toggleFavorite(movie: any): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    if (this.isFavorite(movie._id)) {
      this.fetchApiData.deleteFromFavMovies(user.Username, movie._id).subscribe(() => {
        this.snackBar.open(`${movie.Title} removed from favorites`, 'OK', { duration: 2000 });
        user.FavoriteMovies = user.FavoriteMovies.filter((id: string) => id !== movie._id);
        localStorage.setItem('user', JSON.stringify(user));
        this.loadFavoriteMovies();
      });
    } else {
      this.fetchApiData.addToFavMovies(user.Username, movie._id).subscribe(() => {
        this.snackBar.open(`${movie.Title} added to favorites`, 'OK', { duration: 2000 });
        user.FavoriteMovies.push(movie._id);
        localStorage.setItem('user', JSON.stringify(user));
        this.loadFavoriteMovies();
      });
    }
  }

  /**
   * Checks if a movie is in user's favorites.
   */
  isFavorite(movieId: string): boolean {
    return this.user.FavoriteMovies.includes(movieId);
  }

  /**
   * Updates user's information and saves it to localStorage.
   */
  updateUserInfo(): void {
    const username = this.user.Username;
    this.fetchApiData.editUser(username, this.updatedUser).subscribe(
      (response: any) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.snackBar.open('User info updated successfully', 'OK', { duration: 2000 }).afterDismissed().subscribe(() => {
          this.user = { ...response };
        });
      },
      (error) => {
        this.snackBar.open('Failed to update user info', 'OK', { duration: 2000 });
        console.error('Error updating user info:', error);
      }
    );
  }
}