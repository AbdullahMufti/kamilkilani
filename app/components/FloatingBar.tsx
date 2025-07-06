"use client";
import { useState } from "react";

interface FloatingBarProps {
  currentIndex: number;
  totalStories: number;
  onIndexChange: (index: number) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

export default function FloatingBar({
  currentIndex,
  totalStories,
  onIndexChange,
  fontSize,
  onFontSizeChange,
}: FloatingBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const increaseFontSize = () => {
    onFontSizeChange(Math.min(fontSize + 2, 48));
  };

  const decreaseFontSize = () => {
    onFontSizeChange(Math.max(fontSize - 2, 12));
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < totalStories - 1) {
      onIndexChange(currentIndex + 1);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50  text-4xl">
      <div className=" backdrop-blur-sm border border-gray-200 rounded-full shadow-lg p-2 flex items-center gap-2">
        {/* Font Size Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={decreaseFontSize}
            className="w-8 h-8 rounded-full  flex items-center justify-center   font-bold transition-colors   text-4xl"
            title="تصغير الخط"
          >
            ⌕
          </button>
          <span className="  text-4xl font-medium px-2 min-w-[2rem] text-center  text-4xl">
            {fontSize}
          </span>
          <button
            onClick={increaseFontSize}
            className="w-8 h-8 rounded-full  flex items-center justify-center   font-bold transition-colors  text-4xl"
            title="تكبير الخط"
          >
            🔍︎
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 "></div>

        {/* Story Navigation */}
        <div className="flex items-center gap-1">
          <button
            onClick={goToNext}
            disabled={currentIndex === totalStories - 1}
            className="w-8 h-8 rounded-full  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center   text-4xl transition-colors"
            title="القصة التالية"
          >
            ▶
          </button>
          <span className="  text-4xl font-medium px-2 min-w-[3rem] text-center">
            {currentIndex + 1}/{totalStories}
          </span>
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="w-8 h-8 rounded-full  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center   text-4xl transition-colors"
            title="القصة السابقة"
          >
            ◀
          </button>
        </div>
      </div>
    </div>
  );
}
