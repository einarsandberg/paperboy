import { auth } from "@/auth";
import { getArticles } from "./features/articles/api";
import ArticleList from "@/app/features/articles/ArticleList";
import CategoryList, { Category, categories } from "./features/articles/CategoryList";
import { getSelectedCategory } from "./common/utils/pageUtils";
import { PageProps } from "./common/types";

export default async function Home({ searchParams }: PageProps) {
  const category = getSelectedCategory(searchParams.category);
  const articles = await getArticles(category);

  const session = await auth();

  return (
    <main className="w-full">
      <CategoryList selectedCategory={category} />
      <ArticleList articles={articles} selectedCategory={category} />
    </main>
  );
}
