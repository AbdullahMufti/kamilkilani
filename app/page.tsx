"use client";
import { KamilK } from "@/data/data";
import Link from "next/link";
import DarkModeToggle from "./components/DarkModeToggle";
import { useState } from "react";
export default function Home() {
  const [fontSize, setFontSize] = useState(16);
  const increaseFontSize = () => {
    if (fontSize) {
      setFontSize(Math.min(fontSize + 2, 48));
    }
  };

  const decreaseFontSize = () => {
    if (fontSize) {
      setFontSize(Math.max(fontSize - 2, 12));
    }
  };
  return (
    <main dir="rtl" className="min-h-screen ">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
          <div className="flex flex-row justify-between items-center gap-2 mb-2">
            <button
              onClick={decreaseFontSize}
              className="rounded-full flex items-center justify-center text-sm font-bold transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
              title="تصغير الخط"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" x2="16.65" y1="21" y2="16.65" />
                <line x1="8" x2="14" y1="11" y2="11" />
              </svg>
            </button>
            <span className="text-lg font-medium px-2 min-w-[2rem] text-center">
              {fontSize}
            </span>
            <button
              onClick={increaseFontSize}
              className="rounded-full  items-center justify-center text-sm font-bold transition-colors"
              title="تكبير الخط"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" x2="16.65" y1="21" y2="16.65" />
                <line x1="11" x2="11" y1="8" y2="14" />
                <line x1="8" x2="14" y1="11" y2="11" />
              </svg>
            </button>
            <DarkModeToggle />
          </div>

          <h1 className="text-2xl md:text-6xl font-bold text-center mb-2 ">
            قصص كاميل كيلاني
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
          {KamilK.map((story, index) => (
            <Link
              key={index}
              href={`/story/${index}`}
              className="group block rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={`/covers/${story.image}`}
                  alt={story.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                  {index + 1}
                </div>
              </div>
              <div className="p-4">
                <h2
                  className="text-xl font-semibold  mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {story.title}
                </h2>
                <p className="" style={{ fontSize: `${fontSize}px` }}>
                  {story.chapters.length} فصل
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className=" text-lg">اختر قصة من القائمة أعلاه للبدء في القراءة</p>
          <br />
          <div>Data scraped from hindawi.org for educational purposes</div>
        </div>
      </div>
    </main>
  );
}
