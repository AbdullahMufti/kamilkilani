"use client";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

interface NavigationProps {
  storyTitle?: string;
  fontSize?: number;
  onFontSizeChange?: (size: number) => void;
  currentIndex?: number;
  totalStories?: number;
  onIndexChange?: (index: number) => void;
}

export default function Navigation({
  storyTitle,
  fontSize,
  onFontSizeChange,
  currentIndex,
  totalStories,
  onIndexChange,
}: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side - Back button and Previous */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-medium">العودة للرئيسية</span>
          </Link>
        </div>

        {/* Center - Story Title */}
        {storyTitle && (
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-white text-center">
            {storyTitle}
          </h1>
        )}

        <DarkModeToggle className="" />
      </div>
    </nav>
  );
}
