// App's root component file (default entry point to the app). When user launches app, root component is displayed as home page.

import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }

  // This function will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px' // Assign a width to the dialog
    });
  }

  // This function will open the dialog when the login button is clicked
  openLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '280px' // Assign a width to the dialog
    });
  }
}
