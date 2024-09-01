import { auth } from "@/auth";
import { getArticles } from "./features/articles/api";
import ArticleList from "@/app/features/articles/ArticleList";
import CategoryList, { Category, categories } from "./features/articles/CategoryList";
import Login from "./features/login/Login";

function getSelectedCategory(category: string): Category {
  if (categories.includes(category as Category)) {
    return category as Category;
  }
  return categories[0];
}

export default async function Home({ searchParams }: { searchParams: { [key: string]: string } }) {
  const category = getSelectedCategory(searchParams.category);
  const articles = await getArticles(category);

  const session = await auth();

  return (
    <main className="w-full">
      {/* <Login /> */}
      <CategoryList selectedCategory={category} />

      <ArticleList articles={articles} />
    </main>
  );
}
