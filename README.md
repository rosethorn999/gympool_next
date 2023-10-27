# Gympool

![preview](https://raw.githubusercontent.com/rosethorn999/gympool_next/master/gympool.png)

## Status

[![Unit Test](https://github.com/rosethorn999/gympool_next/actions/workflows/testing.yml/badge.svg?branch=main)](https://github.com/rosethorn999/gympool_next/actions/workflows/testing.yml)
[![Deploy](https://github.com/rosethorn999/gympool_next/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/rosethorn999/gympool_next/actions/workflows/deploy.yml)

## Feature:

- Account/ OAuth
- Filter product
- i18n
- Defensive UI/UX
- SEO

## Skill:

- Next.js
- Tailwind CSS
- Google Cloud Run
- Github actions

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Docker container

```shell
# build
$ docker build -t rosethorn999/gympool_frontend_nextjs:latest .
# run
$ docker run -p 3000:3000 --name next3000 rosethorn999/gympool_frontend_nextjs:latest
```

## Example for .env.local or .env.production file

```
NEXT_PUBLIC_API_HOST=https://gympool-stg-fastapi.nodm.app/
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LfixxxxxxJO1d
```
