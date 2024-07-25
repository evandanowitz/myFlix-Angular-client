import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    console.log('User data before sending:', this.userData);
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        console.log('Login Successful:', result);
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        this.dialogRef.close();
        this.snackBar.open('Login Successful', 'OK', { duration: 2000 });
      }, (error) => {
        console.error('Login Failure:', error);
        this.snackBar.open(error, 'OK', { duration: 2000 });
      }
    );
  }
}