This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Docker / Production deploy

Use `docker-compose.yml` for local development. Make sure you have `.env.local` with your values.

For production deploy via Docker Hub / your server:

1. Copy `.env.production.example` to `.env.production` and fill real values (do not commit):

```bash
cp .env.production.example .env.production
# edit .env.production and add real values
```

2. If you want to pull the image from Docker Hub, update `docker-compose.production.yml` `image:` to your Docker Hub repo (e.g. `youruser/alfiegalley:latest`) and then on the server run:

```bash
docker-compose -f docker-compose.production.yml up -d
```

3. Alternatively, run the image directly with an env file:

```bash
docker run -d --env-file .env.production -p 3000:3000 youruser/alfiegalley:latest
```

4. Or mount the file into the container and let the entrypoint source it (image includes `/app/docker-entrypoint.sh`):

```bash
# mount and run (safer to keep env file on host only)
docker run -d -p 3000:3000 \
	-v $(pwd)/.env.production:/app/.env.production:ro \
	youruser/alfiegalley:latest
```

Helper scripts are available in `scripts/`:

- `scripts/start-prod.sh` — copies `.env.production.example` to `.env.production` if missing and runs the production compose.
- `scripts/run-with-mount.sh` — runs the built image and mounts `.env.production` into `/app/.env.production` so the container entrypoint can source it.

GitHub Actions (see `.github/workflows/docker-publish.yml`) will build and push the image when you push to `main`. Set `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` in your repository Secrets.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
