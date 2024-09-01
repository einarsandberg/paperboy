import ArticleList from "../features/articles/ArticleList";
import { getSavedArticles } from "../features/saved-articles/api";

export default async function SavedArticles() {
  const savedArticles = await getSavedArticles();
  return (
    <div>
      <h1>Saved Articles</h1>
      <ArticleList articles={savedArticles} />
    </div>
  );
}
