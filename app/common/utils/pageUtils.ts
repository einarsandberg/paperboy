import { categories, Category } from "@/app/features/articles/CategoryList";

export function getSelectedCategory(category: string): Category {
  if (categories.includes(category as Category)) {
    return category as Category;
  }
  return categories[0];
}