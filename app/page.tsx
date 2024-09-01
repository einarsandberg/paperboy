import { getArticles } from "./features/articles/api";
import ArticleList, { Article } from "./features/articles/ArticleList";
import CategoryList, {
  Category,
  categories,
} from "./features/articles/CategoryList";

function getSelectedCategory(category: string): Category {
  if (categories.includes(category as Category)) {
    return category as Category;
  }
  return categories[0];
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const category = getSelectedCategory(searchParams.category);
  const articles = await getArticles(category);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CategoryList />
      <ArticleList articles={articles} />
    </main>
  );
}
