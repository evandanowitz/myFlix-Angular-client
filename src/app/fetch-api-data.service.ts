import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://myflix-db-movie-app-af5513e7733f.herokuapp.com/'; // Hosted API URL (Heroku)

/**
 * Marks the service as injectable and available throughout the app.
 * Configured for the root injector.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  /**
   * Initializes the service with HttpClient for making HTTP requests.
   * @param http - The HttpClient instance used for API requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Registers a new user.
   * @param userData - The user details to send in the registration request.
   * @returns Observable with the server response.
   */
  public userRegistration(userData: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in an existing user.
   * @param userData - The user login details (username, password)).
   * @returns Observable with the server response.
   */
  public userLogin(userData: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetches all movies from the API.
   * @returns Observable with the list of movies.
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches details of a specific movie by title.
   * @param title - The title of the movie.
   * @returns Observable with movie details.
   */
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches details of a director by name.
   * @param name - The director's name.
   * @returns Observable with director details.
   */
  public getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + name, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches details of a genre by name.
   * @param name - The genre's name.
   * @returns Observable with genre details.
   */
  public getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/' + name, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches details of a user by username.
   * @param Username - The user's username.
   * @returns Observable with user details.
   */
  public getUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + Username, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches the favorite movies of a user.
   * @param Username - The user's username.
   * @returns Observable with the user's favorite movies.
   */
  public getFavoriteMovies(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + Username + 'movies/', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Add a movie to the user's list of favorite movies.
   * @param Username - The user's username.
   * @param MovieID - The ID of the movie to add to favorites.
   * @returns Observable with the updated user data.
   */
  public addToFavMovies(Username: any, MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + Username + '/movies/' + MovieID, null, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Updates the user's profile details.
   * @param Username - The user's username.
   * @param userDetails - The updated user information.
   * @returns Observable with the updated user data.
   */
  public editUser(Username: any, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + Username, userDetails, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a user by username.
   * @param Username - The user's username.
   * @returns Observable with the server response.
   */
  public deleteUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + Username, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Removes a movie from the user's list of favorite movies.
   * @param Username - The user's username.
   * @param MovieID - The ID of the movie to remove from favorites.
   * @returns Observable with the updated user data.
   */
  public deleteFromFavMovies(Username: any, MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + Username + '/movies/' + MovieID, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Extracts the data from the HTTP response.
   * @param res - The API response object.
   * @returns The extracted response data or an empty object.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles HTTP errors.
   * @param error - The HTTP error response.
   * @returns An observable error message.
   */
  private handleError(error: HttpErrorResponse): any {
    console.error('Registration error:', error);
    if (error.error instanceof ErrorEvent) { // checks if error is a client-side or network error. 'ErrorEvent' used for client-side errors
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Backend error: ${error.status}, body was:`, error.error);
      return throwError(() => // RxJS function that returns an observable that emits an error
        new Error(error.error.message || 'Something went wrong; please try again later.')
      );
    }
  }
}