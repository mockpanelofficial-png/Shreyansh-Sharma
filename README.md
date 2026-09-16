# Shreyansh Sharma Portfolio

Full-stack portfolio for Shreyansh Sharma.

## Structure

- `Shreyansh-Sharma/client` - React and Vite frontend
- `Shreyansh-Sharma/server` - Express API, admin tools and local data fallback

## Run locally

```bash
cd Shreyansh-Sharma
npm install
npm run dev
```

The client runs on `http://localhost:5173` and the API runs on `http://localhost:5000`.

## Render deployment

Use the included `render.yaml` Blueprint, or set these service values manually:

- Root directory: `Shreyansh-Sharma`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Health check path: `/api/health`

Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `JWT_SECRET` as Render environment variables before deploying.