import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://myflix-db-movie-app-af5513e7733f.herokuapp.com/'; // Hosted API URL (Heroku)

// Decorator that marks a class as available to be provided and injected as a dependency
@Injectable({
  providedIn: 'root' // Configures the service for root injector (makes it available throughout app)
})
export class FetchApiDataService {
  // Injecting HttpClient module to constructor params provides it to entire class, available via `this.http`
  // A special method used for initializing objects created with the class. Called when a new instance of the class is created.
  // 'private' restricts the visibility of the 'http' property to within the class. 'http' property can only be used inside the FetchApiDataService class.
  // 'http' is the name of the property that holds the 'HttpClient' instance.
  // 'HttpClient' is a service used to make HTTP requests.
  constructor(private http: HttpClient) { }

  public userRegistration(userData: any): Observable<any> { // userRegistration takes argument of type 'any' that's the 'userDetails' to post to the API endpoint.
    return this.http.post(apiUrl + 'users', userData).pipe( // Using this.http, it posts it to the API endpoint and returns the API's response.
      catchError(this.handleError)
    );
  }
  public userLogin(userData: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userData).pipe(
      catchError(this.handleError)
    );
  }
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  public getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + name, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  public getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/' + name, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  public getUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + Username, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  public getFavoriteMovies(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + Username + 'movies/', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe( // this endpoint does not exist in movie_api, but probably should.
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  public addToFavMovies(Username: any, MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + Username + '/movies/' + MovieID, null, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  public editUser(Username: any, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + Username, userDetails, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  public deleteUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + Username, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  public deleteFromFavMovies(Username: any, MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + Username + '/movies/' + MovieID, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction. @param { Object } res - API response. @returns { any } - Extracted response data.
  private extractResponseData(res: any): any { // 'res' parameter expected to be an object with data type 'any'. Reps response object from HTTP request.
    const body = res; // assign the 'res' parameter (the response object) to 'body' variable
    return body || {}; // returns the 'body' variable. If 'body' is falsy (null or undefined), it returns an empty object {}. Will always return a valid object.
  }

  // Handles HTTP errors. @param { HttpErrorResponse } error - HTTP error response. @returns { any } - Error details.
  private handleError(error: HttpErrorResponse): any { // parameter 'error' is of type 'HttpErrorResponse', which represents the error response from HTTP req.
    console.error('Registration error:', error);
    if (error.error instanceof ErrorEvent) { // checks if the error is a client-side or network error. 'ErrorEvent' is used for client-side errors.
      console.error('Client-side error:', error.error.message); // logs error message to console. Logs the error message from the 'ErrorEvent'.)
    } else { // if the error is a server-side error...
      console.error(`Backend error: ${error.status}, body was:`, error.error); // logs error
      return throwError(() => // a function from RxJS that returns an observable that emits an error.
        new Error(error.error.message || 'Something went wrong; please try again later.') // Creates a new error with a specific message to be thrown.
      );
    }
  }
}