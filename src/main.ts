import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

/**
 * Bootstraps the Angular app using the AppModule.
 * 
 * @remarks
 * This file serves as the entry point for the client-side of the app.
 * It uses `platformBrowserDynamic` to bootstrap the `AppModule`.
 * 
 * The `ngZoneEventCoalescing` option is enabled to reduce the number of change detection events.
 */
platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true // Improves performance by reducing event triggers
})
  .catch(err => console.error(err)); // Handles any errors during the bootstrapping process
