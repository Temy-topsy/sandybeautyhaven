import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

function apiDevMiddleware() {
  return {
    name: 'api-dev-middleware',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = req.url?.split('?')[0];

        if (url === '/api/create-payment-intent' || url === '/api/send-booking-confirmation' || url === '/api/acuity') {
          // Populate env vars into process.env so API handlers can access them
          const env = loadEnv('development', process.cwd(), '');
          for (const key of Object.keys(env)) {
            process.env[key] = env[key];
          }

          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk;
          });

          req.on('end', async () => {
            let parsedBody = {};
            try {
              if (body) parsedBody = JSON.parse(body);
            } catch {
              // ignore json parse error
            }

            const parsedUrl = new URL(req.url, 'http://localhost');
            const queryObj: Record<string, string> = {};
            parsedUrl.searchParams.forEach((v, k) => {
              queryObj[k] = v;
            });

            const mockReq = {
              method: req.method,
              headers: req.headers,
              body: parsedBody,
              query: queryObj,
              url: req.url
            };

            const mockRes = {
              setHeader(k: string, v: string) {
                res.setHeader(k, v);
                return this;
              },
              status(code: number) {
                res.statusCode = code;
                return this;
              },
              json(data: any) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              },
              end() {
                res.end();
              }
            };

            try {
              if (url === '/api/create-payment-intent') {
                const handler = (await import('./api/create-payment-intent.ts')).default;
                await handler(mockReq, mockRes);
              } else if (url === '/api/send-booking-confirmation') {
                const handler = (await import('./api/send-booking-confirmation.ts')).default;
                await handler(mockReq, mockRes);
              } else if (url === '/api/acuity') {
                const handler = (await import('./api/acuity.ts')).default;
                await handler(mockReq, mockRes);
              }
            } catch (err: any) {
              console.error(`Dev API Error [${url}]:`, err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'API processing error' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiDevMiddleware()],
  build: {
    target: 'esnext',
    cssMinify: true,
    rolldownOptions: {
      output: {
        codeSplitting: true
      }
    }
  }
})
