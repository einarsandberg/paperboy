"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAuthenticated = !!session;

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <button className="xl:hidden fixed top-8 p-4" onClick={toggleMenu}>
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-64 z-10 bg-white text-gray-800 flex flex-col items-start py-8 px-4 pt-16 shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0 xl:relative xl:shadow-none`}
      >
        <button className="xl:hidden p-4 self-end" onClick={toggleMenu}>
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <Link
          onClick={() => setIsOpen(false)}
          href="/"
          className={`text-lg py-2 px-4 hover:text-blue-500 transition duration-300 ease-in-out ${
            pathname === "/" ? "underline" : ""
          }`}
        >
          Feed
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          href="/saved-articles"
          className={`text-lg py-2 px-4 hover:text-blue-500 transition duration-300 ease-in-out mt-4 ${
            pathname === "/saved-articles" ? "underline" : ""
          }`}
        >
          Saved articles
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
