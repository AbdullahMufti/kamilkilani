"use client";
import parse from "html-react-parser";
import { useState, useEffect } from "react";
import { use } from "react";
import { KamilK } from "@/data/data";
import Navigation from "../../components/Navigation";
import { useRouter } from "next/navigation";
import { DOMNode } from "html-react-parser";

interface StoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function StoryPage({ params }: StoryPageProps) {
  const router = useRouter();
  const [fontSize, setFontSize] = useState(24);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);

  // Unwrap the params Promise using React.use()
  const { id } = use(params);

  useEffect(() => {
    const storyId = parseInt(id);
    if (storyId >= 0 && storyId < KamilK.length) {
      setStoryIndex(storyId);
    } else {
      // Redirect to home if invalid ID
      router.push("/");
    }
  }, [router, id]);

  const enlargeImage = (url: string) => {
    setEnlargedImage(url);
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
            className="bg-white figure"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        );
      }
    },
  };

  if (storyIndex < 0 || storyIndex >= KamilK.length) {
    return <div>Story not found</div>;
  }

  const currentStory = KamilK[storyIndex];

  return (
    <>
      <Navigation
        storyTitle={currentStory.title}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
      />
      <main dir="rtl" className="pb-8">
        <div style={{ fontSize: `${fontSize}px` }}>
          <h1 className="text-8xl text-center font-bold mt-20">
            {currentStory.title}
          </h1>
          <img
            src={`/covers/${currentStory.image}`}
            className="figure"
            onClick={() => enlargeImage(`/covers/${currentStory.image}`)}
          />
          {enlargedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setEnlargedImage(null)}
            >
              <img
                src={`${enlargedImage}`}
                className="w-full bg-white h-auto max-w-md max-h-screen object-contain"
                onClick={() => setEnlargedImage(null)}
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl"
                onClick={() => setEnlargedImage(null)}
              >
                X
              </button>
            </div>
          )}

          <div>
            {currentStory.chapters.map((EachChap, idx) => (
              <div key={idx}>
                <div>{parse(EachChap.text, parserOptions)}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
