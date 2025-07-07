"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { DOMNode } from "html-react-parser";
import FloatingControls from "./FloatingControl";

interface StoryReaderProps {
  storyIndex: number;
  story: {
    title: string;
    image: string;
    chapters: Array<{ text: string }>;
  };
  totalStories: number;
}

export default function StoryReader({
  storyIndex,
  story,
  totalStories,
}: StoryReaderProps) {
  const router = useRouter();
  const [fontSize, setFontSize] = useState(24);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const enlargeImage = (url: string) => {
    setEnlargedImage(url);
  };

  const handleIndexChange = (newIndex: number) => {
    router.push(`/story/${newIndex}`);
  };

  // Custom parser options to handle image clicks
  const parserOptions = {
    replace: (domNode: DOMNode) => {
      if (
        domNode.type === "tag" &&
        domNode.name === "img" &&
        "attribs" in domNode
      ) {
        return (
          <img
            {...domNode.attribs}
            onClick={() => enlargeImage(domNode.attribs.src)}
            className="bg-white figure rounded-lg shadow-md cursor-pointer"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        );
      }
    },
  };

  const increaseFontSize = () => {
    setFontSize(Math.min(fontSize + 2, 48));
  };

  const decreaseFontSize = () => {
    setFontSize(Math.max(fontSize - 2, 12));
  };

  const goToPrevious = () => {
    if (storyIndex > 0) {
      handleIndexChange(storyIndex - 1);
    }
  };

  const goToNext = () => {
    if (storyIndex < totalStories - 1) {
      handleIndexChange(storyIndex + 1);
    }
  };

  return (
    <>
      {/* Floating Controls - Left Border */}
      <FloatingControls
        storyIndex={storyIndex}
        fontSize={fontSize}
        decreaseFontSize={decreaseFontSize}
        increaseFontSize={increaseFontSize}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />

      <main dir="rtl" className="pb-8 min-h-screen">
        <div style={{ fontSize: `${fontSize}px` }} className="">
          <h1 className="text-2xl md:text-8xl text-center font-bold mt-20">
            {story.title}
          </h1>
          <img
            src={`/covers/${story.image}`}
            className="figure bg-white rounded-lg shadow-md cursor-pointer"
            onClick={() => enlargeImage(`/covers/${story.image}`)}
          />
          {enlargedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setEnlargedImage(null)}
            >
              <img
                src={`${enlargedImage}`}
                className="w-full bg-white h-auto max-w-md max-h-screen object-contain rounded-lg shadow-xl"
                onClick={() => setEnlargedImage(null)}
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-colors"
                onClick={() => setEnlargedImage(null)}
              >
                X
              </button>
            </div>
          )}

          <div className="max-w-none">
            {story.chapters.map((EachChap, idx) => (
              <div key={idx} className="mb-8">
                <div className="leading-relaxed ml-20 md:ml-10">
                  {parse(EachChap.text, parserOptions)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <div>Data scraped from hindawi.org for educational purposes</div>
        </div>
      </main>
    </>
  );
}
