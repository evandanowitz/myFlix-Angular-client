import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {

        // Save token and user info in localStorage
        localStorage.setItem('token', result.token); // Store the token
        localStorage.setItem('user', JSON.stringify(result.user)); // Store the username for later use
        // localStorage.setItem('token', result.token); // Store the token
        // localStorage.setItem('username', result.user.Username); // Store the username for later use

        this.dialogRef.close(); // Close the login dialog

        this.snackBar.open('Login Successful', 'OK', { duration: 2000 }); // Display success message

        this.router.navigate(['movies']); // Navigate to the movies page after successful login
      }, (error) => {
        console.error('Login Failure:', error);

        // this.snackBar.open(error, 'OK', { duration: 2000 });
        this.snackBar.open('Login Failed: ' + error.message, 'OK', { duration: 2000 });
      }
    );
  }
}