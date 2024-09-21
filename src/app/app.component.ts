// App's root component file (default entry point to the app). When user launches app, root component is displayed as home page.
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Any logic that is specifically for AppComponent can go here (if any)
  }
}