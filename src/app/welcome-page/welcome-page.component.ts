// This will be the component that's returned when the /welcome route is opened.

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
  ngOnInit(): void {
    localStorage.clear();
    console.log('User session cleared, redirected to welcome page');
  }
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