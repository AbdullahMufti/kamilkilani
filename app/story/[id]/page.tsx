import { KamilK } from "@/data/data";
import Navigation from "../../components/Navigation";
import StoryReader from "../../components/StoryReader";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const storyId = parseInt(id);

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
      .substring(0, 50)
      .trim() + (firstChapterText.length > 50 ? "..." : "");

  return {
    title: `${currentStory.title} - Kamil Kilani Stories`,
    description: description,
    images: [
      {
        url: `https://kamilkilani.vercel.app/covers/${currentStory.image}`,
        width: 360,
        height: 480,
        alt: currentStory.title,
      },
    ],
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
          url: `https://kamilkilani.vercel.app/covers/${currentStory.image}`,
          width: 360,
          height: 480,
          alt: currentStory.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: currentStory.title,
      description: description,
      images: [`https://kamilkilani.vercel.app/covers/${currentStory.image}`],
    },
    alternates: {
      canonical: `/story/${storyId}`,
    },
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { id } = await params;
  const storyId = parseInt(id);

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
