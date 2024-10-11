import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

/**
 * The Express app is exported so that it can be used by serverless Functions.
 * Initializes and configures an Express server for Angular Universal server-side rendering (SSR).
 * @returns {express.Express} The configured Express server.
 */
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  /**
   * Example Express Rest API endpoints
   * server.get('/api/**', (req, res) => { });
   */

  /**
   * Serve static files from the /browser directory.
   */
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y', // Cache for 1 year
    index: 'index.html',
  }));

  /**
   * Use Angular SSR engine for all other routes.
   */
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

/**
 * Starts the Express server on the specified port (default 4000).
 */
function run(): void {
  const port = process.env['PORT'] || 4000;

  /**
   * Start up the Node.js Express server.
   */
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
