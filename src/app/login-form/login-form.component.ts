import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * LoginFormComponent handles user login. It sends user's credentials to the backend,
 * processes the response, and navigates user to the movie card page upon successful login.
 */
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' }; // Holds user's login input.

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Sends the login data to the backend. On success, stores the token and user information in localStorage,
   * displays a success message, and navigates user to movie card page.
   * On failure, displays an error message.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {

        localStorage.setItem('token', result.token); // Save token in localStorage.
        localStorage.setItem('user', JSON.stringify(result.user)); // Save user info in localStorage.

        this.dialogRef.close(); // Close login dialog.

        this.snackBar.open('Login Successful', 'OK', { duration: 2000 }); // Display success message.

        this.router.navigate(['movies']); // Navigate to the movies page.
      }, (error) => {
        console.error('Login Failure:', error);

        this.snackBar.open('Login Failed: ' + error.message, 'OK', { duration: 2000 }); // Display error messsage.
      }
    );
  }
}