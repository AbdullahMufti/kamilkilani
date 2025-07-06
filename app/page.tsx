"use client";
import { KamilK } from "@/data/data";
import Link from "next/link";

export default function Home() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-6xl font-bold text-center mb-12 text-gray-800">
          قصص كاميل كيلاني
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {KamilK.map((story, index) => (
            <Link
              key={index}
              href={`/story/${index}`}
              className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
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
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {story.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {story.chapters.length} فصل
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            اختر قصة من القائمة أعلاه للبدء في القراءة
          </p>
        </div>
      </div>
    </main>
  );
}
