"use client";
import { RxStar, RxStarFilled } from "react-icons/rx";
import { Article } from "./ArticleList";
import { removeArticle, saveArticle } from "../saved-articles/api";
import { revalidatePath } from "next/cache";

interface SaveArticleButtonProps {
  article: Article;
  savedArticles: Article[];
}

function SaveArticleButton({ article, savedArticles }: SaveArticleButtonProps) {
  const isSaved = savedArticles.some((a) => a.url === article.url);
  return (
    <button
      aria-label="save to my articles"
      title="Save to my articles"
      onClick={(e) => {
        if (!isSaved) {
          saveArticle(article);
        } else {
          // Save article in local storage
          removeArticle(article.url);
        }
      }}
    >
      {isSaved ? <RxStarFilled className="text-2xl" /> : <RxStar className="text-2xl" />}
    </button>
  );
}

export default SaveArticleButton;
