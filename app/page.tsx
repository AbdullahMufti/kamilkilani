"use client";
import parse from "html-react-parser";
import { useState } from "react";
import { KamilK } from "@/data/data";
import FloatingBar from "./components/FloatingBar";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fontSize, setFontSize] = useState(24);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const enlargeImage = (url: string) => {
    setEnlargedImage(url);
  };

  // Custom parser options to handle image clicks
  const parserOptions = {
    replace: (domNode: any) => {
      if (domNode.type === "tag" && domNode.name === "img") {
        return (
          <img
            {...domNode.attribs}
            onClick={() => enlargeImage(domNode.attribs.src)}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        );
      }
    },
  };

  return (
    <main dir="rtl" className="pb-20">
      <div style={{ fontSize: `${fontSize}px` }}>
        <h1 className="text-8xl text-center font-bold">
          {KamilK[currentIndex].title}
        </h1>
        <img
          src={`/covers/${KamilK[currentIndex].image}`}
          className="figure"
          onClick={() => enlargeImage(`/covers/${KamilK[currentIndex].image}`)}
        />
        {enlargedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <img
              src={`${enlargedImage}`}
              className="w-full h-auto max-w-4xl max-h-screen object-contain"
              onClick={() => setEnlargedImage(null)}
            />
          </div>
        )}

        <div>
          {KamilK[currentIndex].chapters.map((EachChap, idx) => (
            <div key={idx}>
              <div>{parse(EachChap.text, parserOptions)}</div>
            </div>
          ))}
        </div>
      </div>

      <FloatingBar
        currentIndex={currentIndex}
        totalStories={KamilK.length}
        onIndexChange={setCurrentIndex}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
      />
    </main>
  );
}
