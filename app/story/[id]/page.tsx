"use client";
import parse from "html-react-parser";
import { useState, useEffect } from "react";
import { use } from "react";
import { KamilK } from "@/data/data";
import Navigation from "../../components/Navigation";
import { useRouter } from "next/navigation";
import { DOMNode } from "html-react-parser";
import FloatingControls from "@/app/components/FloatingControl";
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
            className="bg-white  figure rounded-lg shadow-md"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        );
      }
    },
  };

  if (storyIndex < 0 || storyIndex >= KamilK.length) {
    return <div className="text-gray-800 dark:text-white">Story not found</div>;
  }

  const currentStory = KamilK[storyIndex];
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
  const goToPrevious = () => {
    if (storyIndex !== undefined && storyIndex > 0) {
      handleIndexChange(storyIndex - 1);
    }
  };

  const goToNext = () => {
    if (storyIndex !== undefined && storyIndex < KamilK.length - 1) {
      handleIndexChange(storyIndex + 1);
    }
  };

  return (
    <>
      <Navigation
        storyTitle={currentStory.title}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        currentIndex={storyIndex}
        totalStories={KamilK.length}
        onIndexChange={handleIndexChange}
      />

      {/* Floating Controls - Left Border */}
      <FloatingControls
        storyIndex={storyIndex}
        fontSize={fontSize}
        decreaseFontSize={decreaseFontSize}
        increaseFontSize={increaseFontSize}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />

      <main dir="rtl" className="pb-8  min-h-screen ">
        <div style={{ fontSize: `${fontSize}px` }} className="">
          <h1 className="text-8xl text-center font-bold mt-20 text-gray-800 dark:text-white">
            {currentStory.title}
          </h1>
          <img
            src={`/covers/${currentStory.image}`}
            className="figure bg-white  rounded-lg shadow-md"
            onClick={() => enlargeImage(`/covers/${currentStory.image}`)}
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

          <div className=" max-w-none">
            {currentStory.chapters.map((EachChap, idx) => (
              <div key={idx} className="mb-8">
                <div className=" leading-relaxed ml-20 md:ml-10">
                  {parse(EachChap.text, parserOptions)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
