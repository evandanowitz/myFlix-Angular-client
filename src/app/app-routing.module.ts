// Defines the routes for the app.

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: 'welcome-page', component: WelcomePageComponent }, // Welcome page with signup and login options
  { path: 'movie-card', component: MovieCardComponent },
  { path: 'movies', component: MovieCardComponent }, // Route to display movies
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'login-form', component: LoginFormComponent },
  { path: '', redirectTo: 'welcome-page', pathMatch: 'full' }, // Default (empty) route redirects to the welcome page
  { path: '**', redirectTo: 'welcome-page' } // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }