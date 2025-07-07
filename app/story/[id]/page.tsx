import { KamilK } from "@/data/data";
import Navigation from "../../components/Navigation";
import StoryReader from "../../components/StoryReader";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface StoryPageProps {
  params: {
    id: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const storyId = parseInt(params.id);

  // Validate story ID
  if (isNaN(storyId) || storyId < 0 || storyId >= KamilK.length) {
    return {
      title: "Story Not Found",
      description: "The requested story could not be found.",
    };
  }

  const currentStory = KamilK[storyId];

  // Get the first chapter text for description (limit to 160 characters)
  const firstChapterText = currentStory.chapters[0]?.text || "";
  const description =
    firstChapterText
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .substring(0, 160)
      .trim() + (firstChapterText.length > 160 ? "..." : "");

  return {
    title: `${currentStory.title} - Kamil Kilani Stories`,
    description: description,
    keywords: [
      "قصة",
      "كامل كيلاني",
      "أدب عربي",
      "قصص أطفال",
      "Arabic stories",
      "Kamil Kilani",
    ],
    authors: [{ name: "Kamil Kilani" }],
    openGraph: {
      title: currentStory.title,
      description: description,
      type: "article",
      images: [
        {
          url: `/covers/${currentStory.image}`,
          width: 270,
          height: 360,
          alt: currentStory.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: currentStory.title,
      description: description,
      images: [`/covers/${currentStory.image}`],
    },
    alternates: {
      canonical: `/story/${storyId}`,
    },
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
