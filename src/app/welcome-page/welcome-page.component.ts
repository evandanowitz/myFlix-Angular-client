// Component displayed when the /welcome route is opened

import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  /**
   * Lifecycle hook that runs when the component is initialized.
   * Clears the user session and logs the action to the console.
   */
  ngOnInit(): void {
    localStorage.clear();
    console.log('User session cleared, redirected to welcome page');
  }

  /**
   * Opens the user registration dialog when the signup button is clicked.
   * @returns void
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px' // Set the width of the dialog
    });
  }

  /**
   * Opens the login dialog when the login button is clicked.
   * @returns void
   */
  openLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '280px' // Set the width of the dialog
    });
  }
}