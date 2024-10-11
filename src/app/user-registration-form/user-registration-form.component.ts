import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Used to close the dialog after successful registration
import { FetchApiDataService } from '../fetch-api-data.service'; // For making API calls to the backend
import { MatSnackBar } from '@angular/material/snack-bar'; // Used to display success/error notifications

/**
 * The Component decorator tells Angular that the class below is a component.
 * It wires up the component with its associated stylesheet and template.
 * This component can be used in other HTML templates, like app.component.html,
 * via the custom HTML element <app-user-registration-form>.
 */
@Component({
  selector: 'app-user-registration-form', // Defines the custom HTML element for this component.
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})

/**
 * This component renders the user registration form, allowing users to sign up for a new account.
 * It sends user input to the backend API using FetchApiDataService.
 */
export class UserRegistrationFormComponent implements OnInit {

  /**
   * Object to store user's form input data for user registration.
   * The Input decorator defines the component's input. Allows data to be passed into this component from other parts of app.
   * This object ('userData') will then be passed into the API call within the 'registerUser' function.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  /**
   * Lifecycle hook called after the component has been initialized.
   * It runs once the component has received all its data-bound inputs.
   */
  ngOnInit(): void {
  }

  /**
   * Sends user input to the backend to register user.
   * Closes the dialog on success and displays notification.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        console.log('Registration Successful:', result);
        this.dialogRef.close();
        this.snackBar.open('Registration Successful', 'OK', { duration: 2000 });
      },
      (error) => {
        console.error('Registration Failure:', error);
        this.snackBar.open(error, 'OK', { duration: 2000 });
      }
    );
  }
}