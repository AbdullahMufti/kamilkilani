import { KamilK } from "@/data/data";
import Navigation from "../../components/Navigation";
import StoryReader from "../../components/StoryReader";
import { notFound } from "next/navigation";

interface StoryPageProps {
  params: {
    id: string;
  };
}

export default function StoryPage({ params }: StoryPageProps) {
  const storyId = parseInt(params.id);

  // Validate story ID
  if (isNaN(storyId) || storyId < 0 || storyId >= KamilK.length) {
    notFound();
  }

  const currentStory = KamilK[storyId];

  return (
    <>
      <Navigation storyTitle={currentStory.title} />
      <StoryReader
        storyIndex={storyId}
        story={currentStory}
        totalStories={KamilK.length}
      />
    </>
  );
}
