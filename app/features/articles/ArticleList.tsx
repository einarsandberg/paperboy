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
}

interface ArticleListProps {
  articles: Article[];
}
async function ArticleList({ articles }: ArticleListProps) {
  return (
    <article className="grid grid-cols-1 gap-6">
      {articles.map((article) => (
        <a
          key={article.url}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-5 transition-transform transform hover:-translate-y-1 hover:shadow-lg border border-gray-200 rounded-lg bg-white"
        >
          <div className="h-48 relative rounded-lg overflow-hidden">
            {article.urlToImage ? (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-90"
              />
            ) : (
              <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
          <h2 className="text-lg font-semibold mt-4 text-gray-800 group-hover:text-blue-600">
            {article.title}
          </h2>
          <p className="text-sm text-gray-500 mt-2">{article.source.name}</p>
        </a>
      ))}
    </article>
  );
}

export default ArticleList;
