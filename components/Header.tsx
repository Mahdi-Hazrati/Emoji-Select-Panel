import Link from "next/link";
import { Home, BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white bg-opacity-50 backdrop-blur-lg  py-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 flex-wrap gap-2">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <span role="img" aria-label="emoji select" className="text-3xl">😊</span> 
          Emoji Select Panel Component
        </h1>
        <nav className="flex gap-8">
          <Link href="/" className="text-gray-700 hover:text-blue-500 flex items-center gap-1">
            <Home size={20} /> Home
          </Link>
          <Link href="/docs" className="text-gray-700 hover:text-blue-500 flex items-center gap-1">
            <BookOpen size={20} /> Documentation
          </Link>
        </nav>
      </div>
    </header>
  );
}
