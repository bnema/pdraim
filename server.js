// Production entry: adds cache headers for static assets, then delegates to SvelteKit.
// Copied into the image next to build/ (see Dockerfile).
import http from 'node:http';
import { handler } from './build/handler.js';

const host = process.env.HOST ?? '0.0.0.0';
const port = Number(process.env.PORT ?? 3000);

const cacheRules = [
	[/^\/fonts\//, 'public, max-age=31536000, immutable'],
	[/^\/(aim|desktop|sounds|smileys)\/|^\/favicon\.png$/, 'public, max-age=2592000']
];

const server = http.createServer((req, res) => {
	const path = req.url?.split('?')[0] ?? '/';
	const rule = cacheRules.find(([pattern]) => pattern.test(path));
	if (rule) res.setHeader('Cache-Control', rule[1]);
	handler(req, res);
});

server.listen(port, host, () => console.log(`Listening on http://${host}:${port}`));

for (const signal of ['SIGINT', 'SIGTERM']) {
	process.on(signal, () => server.close(() => process.exit(0)));
}
