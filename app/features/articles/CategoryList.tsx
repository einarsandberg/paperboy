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

async function CategoryList() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <Link
          key={category}
          href={`?category=${category}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize"
        >
          {category}
        </Link>
      ))}
    </div>
  );
}

export default CategoryList;
