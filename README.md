# Paperboy

Find news by category.

## How it works:

1. If not logged in, gives you a list of articles for a number of different categories.
2. If you're logged in, you can save articles to read later.

## To run:

1. Add a file called `env.local` with the following content:

```
NEWS_API_KEY=XXXXXX # api key for [News API](https://newsapi.org/)
AUTH_SECRET=XXXXXX # auth.js secret
AUTH_GITHUB_ID=XXXXX # github oauth id
AUTH_GITHUB_SECRET=XXXXX # github oauth secret
POSTGRES_DATABASE=verceldb
POSTGRES_HOST=example.com
POSTGRES_PASSWORD=XXXXX
POSTGRES_PRISMA_URL="postgres://XXXXX"
POSTGRES_URL="postgres://XXXXX"
POSTGRES_URL_NON_POOLING="postgres://XXXXX"
POSTGRES_URL_NO_SSL="postgres://XXXXXX"
POSTGRES_USER="XXXXXX"
```

2. `npm i && npm run dev`
