import { Hono } from 'hono';

const app = new Hono();

app.get('/hello', c => c.text('Hello World!'));

export default app;
