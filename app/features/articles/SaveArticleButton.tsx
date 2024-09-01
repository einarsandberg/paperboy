"use client";
import { RxStar, RxStarFilled } from "react-icons/rx";
import { Article } from "./ArticleList";
import { removeArticle, saveArticle } from "../saved-articles/api";
import { revalidatePath } from "next/cache";
import { useSession } from "next-auth/react";

interface SaveArticleButtonProps {
  article: Article;
  savedArticles: Article[];
}

function SaveArticleButton({ article, savedArticles }: SaveArticleButtonProps) {
  const isSaved = savedArticles.some((a) => a.url === article.url);
  const { data: session } = useSession();
  if (!session?.user?.email) {
    return null;
  }
  return (
    <button
      aria-label="save to my articles"
      title="Save to my articles"
      onClick={() => {
        if (session?.user?.email) {
          if (!isSaved) {
            saveArticle(article, session.user.email);
          } else {
            // Save article in local storage
            removeArticle(article.url, session.user.email);
          }
        }
      }}
    >
      {isSaved ? <RxStarFilled className="text-2xl" /> : <RxStar className="text-2xl" />}
    </button>
  );
}

export default SaveArticleButton;
