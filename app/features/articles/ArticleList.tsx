import { auth } from "@/auth";
import { getSavedArticles } from "../saved-articles/api";
import SaveArticleButton from "./SaveArticleButton";

export interface Article {
  author: string;
  title: string;

  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
  description?: string;
  content?: string;
  urlToImage?: string;
  category: string;
}

interface ArticleListProps {
  articles: Article[];
  selectedCategory: string;
}

async function ArticleList({ articles, selectedCategory }: ArticleListProps) {
  const session = await auth();
  const savedArticles = session?.user?.email ? await getSavedArticles(selectedCategory, session.user.email) : [];

  return (
    <div className="grid grid-cols-1 gap-6 px-4 sm:px-0 w-full">
      {articles.length === 0 ? <p className="text-center text-gray-500">No articles found</p> : null}
      {articles.map((article) => (
        <article
          key={article.url}
          className="group block p-5 transition-shadow hover:shadow-lg border border-gray-200 rounded-lg bg-white w-full"
        >
          <div className="flex justify-end mb-8">
            {session?.user?.email ? <SaveArticleButton article={article} savedArticles={savedArticles} /> : null}
          </div>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <div className="h-48 relative rounded-lg overflow-hidden">
              {article.urlToImage ? (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-90"
                />
              ) : (
                <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-500">No Image</div>
              )}
            </div>
            <h2 className="text-lg font-semibold mt-4 text-gray-800 group-hover:text-blue-600">{article.title}</h2>
            <p className="text-sm text-gray-500 mt-2">{article.source.name}</p>
          </a>
        </article>
      ))}
    </div>
  );
}

export default ArticleList;
