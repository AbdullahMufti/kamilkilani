import type { Metadata } from "next";
import { Noto_Naskh_Arabic, Roboto } from "next/font/google";
import "./globals.css";

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh-arabic",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "قصص كاميل كيلاني",
  description: "قصص كاميل كيلاني",
  icons: {
    icon: "/kk.jpg",
  },
  openGraph: {
    images: ["/kk.jpg"],
    title: "قصص كاميل كيلاني",
    description: "قصص كاميل كيلاني",
    url: "https://kamilkilani.com",
    siteName: "قصص كاميل كيلاني",
    locale: "ar-SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "قصص كاميل كيلاني",
    description: "قصص كاميل كيلاني",
    images: ["/kk.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${notoNaskhArabic.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
