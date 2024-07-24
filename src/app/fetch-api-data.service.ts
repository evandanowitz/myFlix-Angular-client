import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://myflix-db-movie-app-af5513e7733f.herokuapp.com/'; // Hosted API URL (Heroku)

// A decorator that marks a class as available to be provided and injected as a dependency
@Injectable({
  providedIn: 'root' // Configures the service to be provided in the root injector, making it available throughout the app.
})
export class FetchApiDataService {
  // Injecting HttpClient module to constructor params provides it to entire class, available via `this.http`
  // A special method used for initializing objects created with the class. Called when a new instance of the class is created.
  // 'private' restricts the visibility of the 'http' property to within the class. 'http' property can only be used inside the FetchApiDataService class.
  // 'http' is the name of the property that holds the 'HttpClient' instance.
  // 'HttpClient' is a service used to make HTTP requests.
  constructor(private http: HttpClient) { }

}