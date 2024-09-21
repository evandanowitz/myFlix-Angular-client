import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

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

  ngOnInit(): void {
    this.fetchAllMovies();
    this.getUserInfo();
  }

  // Fetch all movies
  fetchAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any) => {
      this.movies = movies;
      this.loadFavoriteMovies();
    })
  }

  // Get user data (and favorite movie IDs) from localStorage
  getUserInfo(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('User info found in localStorage:', storedUser);
      this.user = JSON.parse(storedUser);
      this.loadFavoriteMovies();
    } else {
      console.error('No user data found in localStorage.');
    }
  }

  loadFavoriteMovies(): void {
    const favoriteMovieIds = this.user.FavoriteMovies || [];
    this.favoriteMovies = this.movies.filter((movie: any) => favoriteMovieIds.includes(movie._id));
    console.log('Filtered favoriteMovies:', this.favoriteMovies);
  }

  // Open dialog for Genre
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
  // Open dialog for Director
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
  // Open dialog for Synopsis
  openSynopsisDialog(movie: any): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: `Synopsis: ${movie.Title}`,
        content: movie.Description
      }
    });
  }

  // Toggle favorite status for a movie (add/remove)
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

  // Check if a movie is in favorites
  isFavorite(movieId: string): boolean {
    return this.user.FavoriteMovies.includes(movieId);
  }

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