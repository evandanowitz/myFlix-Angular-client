// The server-side module for Angular Universal (SSR).

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    // Import the main AppModule and Angular's ServerModule.
    AppModule,
    ServerModule,
  ],
  // Bootstrap the root component for server-side rendering
  bootstrap: [AppComponent],
})
export class AppServerModule { }
