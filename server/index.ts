import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { Hono } from 'hono';
import hello from './API/hello';
export function bootstrapApp() {
  const engineAngular = new AngularAppEngine();
  const server = new Hono();

  server.route('/api', hello);
  server.get('/*', async c => {
    const res = await engineAngular.handle(c.req.raw, { server: 'hono' });
    return res || undefined;
  });

  console.warn('Hono server started');

  return server;
}

const server = bootstrapApp();

export const reqHandler = createRequestHandler(server.fetch);
