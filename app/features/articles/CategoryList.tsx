import Link from "next/link";
export const categories = [
  "general",
  "technology",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
] as const;

export type Category = (typeof categories)[number];

interface CategoryListProps {
  selectedCategory: Category;
}
async function CategoryList({ selectedCategory }: CategoryListProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <Link
          key={category}
          href={`?category=${category}`}
          className={`${
            selectedCategory === category
              ? "bg-blue-700 text-white"
              : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white"
          } font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 capitalize m-2`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}

export default CategoryList;
