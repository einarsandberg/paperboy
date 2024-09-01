import ArticleList from "../features/articles/ArticleList";
import CategoryList from "../features/articles/CategoryList";
import { getSavedArticles } from "../features/saved-articles/api";
export const dynamic = "force-dynamic";

export default async function SavedArticles() {
  const savedArticles = await getSavedArticles();
  return (
    <>
      <CategoryList selectedCategory="general" />
      <ArticleList articles={savedArticles} />
    </>
  );
}
