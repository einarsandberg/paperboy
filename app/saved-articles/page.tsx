import { auth } from "@/auth";
import { PageProps } from "../common/types";
import { getSelectedCategory } from "../common/utils/pageUtils";
import ArticleList from "../features/articles/ArticleList";
import CategoryList from "../features/articles/CategoryList";
import { getSavedArticles } from "../features/saved-articles/api";
export const dynamic = "force-dynamic";

export default async function SavedArticles({ searchParams }: PageProps) {
  const category = getSelectedCategory(searchParams.category);
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }
  const savedArticles = await getSavedArticles(category, session.user.email);
  return (
    <>
      <CategoryList selectedCategory={category} />
      <ArticleList articles={savedArticles} selectedCategory={category} />
    </>
  );
}
