"use server";

import { sql } from '@vercel/postgres';
import { Article } from "../articles/ArticleList";
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
export async function saveArticle(article: Article, userEmail: string) {
  try {
     // Check if the user already exists
    const existingUser = await sql`SELECT article_urls FROM user_saved_articles WHERE user_email = ${userEmail};
  `;

  if (existingUser.rowCount && existingUser.rowCount > 0) {
    // User exists, append the new article URL
    await sql`
      UPDATE user_saved_articles
      SET article_urls = array_append(article_urls, ${article.url})
      WHERE user_email = ${userEmail};
    `;
  } else {
    // User does not exist, insert a new row
    await sql`
      INSERT INTO user_saved_articles (user_email, article_urls)
      VALUES (${userEmail}, ARRAY[${article.url}]);
    `;
  }
    await sql`INSERT INTO saved_articles (url, title, author, content, published_at, source_name, description, url_to_image, category) VALUES (${article.url}, ${article.title}, ${article.author}, ${article.content}, ${article.publishedAt}, ${article.source.name}, ${article.description}, ${article.urlToImage}, ${article.category})`;
    revalidatePath("/saved-articles");
  }
  catch (error) {
    console.error(error);
  }
}

export async function removeArticle(articleUrl: string, userEmail: string) {
  await sql`DELETE FROM saved_articles WHERE url = ${articleUrl}`;
  await sql`
    UPDATE user_saved_articles
    SET article_urls = array_remove(article_urls, ${articleUrl})
    WHERE user_email = ${userEmail};
  `;
  revalidatePath("/saved-articles");
}

export async function getSavedArticles(category: string, userEmail: string) {
  const session = await auth();
  if (!session || !session.user) {
    return [];
  }
  const { rows } = await sql`SELECT * FROM saved_articles WHERE category = ${category}`;
  // check if the user has saved any articles
  const userSavedArticles = await sql`SELECT article_urls FROM user_saved_articles WHERE user_email = ${userEmail}`;
  if (!userSavedArticles.rowCount || userSavedArticles.rowCount === 0) {
    return [];
  }
  const userSavedArticleUrls = userSavedArticles.rows[0].article_urls;
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
      category: row.category,
      author: row.author,
    };
  }).filter((article) => userSavedArticleUrls.includes(article.url));
}
