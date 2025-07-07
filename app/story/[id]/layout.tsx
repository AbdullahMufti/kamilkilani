import type { Metadata } from "next";
import { KamilK } from "@/data/data";

export default function RootLayout({
  params,
  children,
}: Readonly<{
  params: {
    id: string;
  };
  children: React.ReactNode;
}>) {
  const storyId = parseInt(params.id);
  const story = KamilK[storyId];
  const title = story.title;
  const description = story.chapters.length + " فصل";
  const image = `/covers/${story.image}`;
  const url = `https://kamilkilani.vercel.app/story/${storyId}`;

  const metadata: Metadata = {
    title: `${title} - قصص كاميل كيلاني`,
    description: description,
    icons: {
      icon: "/kk.jpg",
    },
    openGraph: {
      title: `${title} - قصص كاميل كيلاني`,
      description: description,
      images: [image],
      url: url,
      locale: "ar-SA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - قصص كاميل كيلاني`,
      description: description,
      images: [image],
    },
  };
  return <div className="min-h-screen">{children}</div>;
}
