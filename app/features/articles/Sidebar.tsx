"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="top-0 left-0 h-full w-64 text-gray-800 flex flex-col items-start py-8 px-4 pt-16">
      <Link
        href="/"
        className={`text-lg py-2 px-4 hover:text-blue-500 transition duration-300 ease-in-out ${
          pathname === "/" ? "underline" : ""
        }`}
      >
        Feed
      </Link>
      <Link
        href="/saved-articles"
        className={`text-lg py-2 px-4 hover:text-blue-500 transition duration-300 ease-in-out mt-4 ${
          pathname === "/saved-articles" ? "underline" : ""
        }`}
      >
        Saved articles
      </Link>
    </div>
  );
}

export default Sidebar;
