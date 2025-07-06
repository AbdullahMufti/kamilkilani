"use client";
import Link from "next/link";

interface NavigationProps {
  storyTitle?: string;
  fontSize?: number;
  onFontSizeChange?: (size: number) => void;
}

export default function Navigation({
  storyTitle,
  fontSize,
  onFontSizeChange,
}: NavigationProps) {
  const increaseFontSize = () => {
    if (onFontSizeChange && fontSize) {
      onFontSizeChange(Math.min(fontSize + 2, 48));
    }
  };

  const decreaseFontSize = () => {
    if (onFontSizeChange && fontSize) {
      onFontSizeChange(Math.max(fontSize - 2, 12));
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0  backdrop-blur-sm border-b border-gray-200 z-40 bg-inverse">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
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
        {storyTitle && (
          <h1 className="text-4xl font-semibold text-gray-800  text-center text-white">
            {storyTitle}
          </h1>
        )}
        {/* Font Size Controls */}
        {fontSize && onFontSizeChange && (
          <div className="flex items-center gap-2">
            <button
              onClick={decreaseFontSize}
              className=" rounded-full  flex items-center justify-center text-sm font-bold transition-colors"
              title="تصغير الخط"
            >
              A-
            </button>
            <span className="text-sm font-medium px-2 min-w-[2rem] text-center">
              {fontSize}
            </span>
            <button
              onClick={increaseFontSize}
              className=" rounded-full  flex items-center justify-center text-sm font-bold transition-colors"
              title="تكبير الخط"
            >
              A+
            </button>
          </div>
        )}
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>
    </nav>
  );
}
