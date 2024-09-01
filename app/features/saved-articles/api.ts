"use server";

import { sql } from '@vercel/postgres';
import { Article } from "../articles/ArticleList";


export async function saveArticle(article: Article) {
  try {
    await sql`INSERT INTO saved_articles (url, title, author, content, published_at, source_name, description, url_to_image) VALUES (${article.url}, ${article.title}, ${article.author}, ${article.content}, ${article.publishedAt}, ${article.source.name}, ${article.description}, ${article.urlToImage})`;
  }
  catch (error) {
    console.error(error);
  }
}

export async function removeArticle(articleUrl: string) {
  await sql`DELETE FROM saved_articles WHERE url = ${articleUrl}`;
}

export async function getSavedArticles() {
  const { rows } = await sql`SELECT * FROM saved_articles`;
  return rows.map((row) => {
    return {
      url: row.url,
      title: row.title,
      content: row.content,
      publishedAt: row.published_at,
      source: {
        name: row.source_name,
      },
      description: row.description,
      urlToImage: row.url_to_image,
    } as Article;
  })
}
