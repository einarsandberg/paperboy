import 'server-only';
import { Category } from './CategoryList';
import { Article } from './ArticleList';

export async function getArticles(category: Category) {
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en`;
  const res = await fetch(url, {
    headers: {
      "x-api-key": process.env.NEWS_API_KEY || "",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  const data = await res.json();
  // Add category to each article
  const articles: Article[] = data.articles.map((article: Article) => {
    return { ...article, category };
  });
  return articles;
}