# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## Project Overview

myFlix is a single-page, responsive movie app built with Angular. The app interacts with an existing server-side API, providing users with information about various movies, directors, and genres. Users can also create an account, log in, and save their favorite movies. The app is designed using Angular Material and includes features such as routing, authentication, and data handling through REST API endpoints.

## Key Features

- User Authentication: Sign up and log in to access app features.
- Movie Listings: Browse all available movies in the database.
- Movie Details: View detailed information about each movie, including:
  - Genre Info: Get details about the genre of the movie.
  - Director Info: Learn about the movie's director.
- Favorite Movies: Add or remove movies from list of favorites.

## Prerequisites

Before running the project, ensure you have the following installed locally on your machine:
- Node.js: version 14.0.0 or later
- npm: version 6.0.0 or later
- Angular CLI: version 18.1.1 or later

## Installation
1. Clone the repository: `git clone https://github.com/evandanowitz/myFlix-Angular-client.git`
2. Navigate to the project directory: `cd myflix-angular-client`
3. Install dependencies: `npm install`
4. Start the development server: `ng serve`
  - Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any source files.

## Code scaffolding

To generate a new component, run:
- `ng generate component component-name`

To generate other Angular resources (directive, pipe, service, etc.), use:
- `ng generate directive|pipe|service|class|guard|interface|enum|module`

## Building the Project

To build the project, run: `ng build`
- The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

To execute unit tests via [Karma](https://karma-runner.github.io), run: `ng test`

## Running End-To-End Tests

To execute end-to-end tests via a platform of your choice, run: `ng e2e`
- (Note: You may need to install additional package for end-to-end testing.)

## Deployment

This project is hosted on GitHub Pages. To deploy, run: `ng deploy --base-href=/`
- Make sure you have the `angular-cli-ghpages` package installed before deploying.

## Technical Requirements (Recap)

Angular Version: The app is built with Angular 18.1.1 and higher.
Server-Side: The client interacts with the server-side REST API.
Design: The app is styled using Angular Material.
Documentation: TypeDoc is used for inline documentation in the codebase.
Hosting: The app is hosted on GitHub Pages.

## Further help

For more help on Angular CLI, use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
