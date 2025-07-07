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
  title: {
    default: "قصص كاميل كيلاني - Kamil Kilani Stories",
    template: "%s | قصص كاميل كيلاني",
  },
  description:
    "مجموعة من أجمل قصص كاميل كيلاني للأطفال والكبار. قصص تعليمية وترفيهية باللغة العربية.",
  keywords: [
    "كامل كيلاني",
    "قصص أطفال",
    "أدب عربي",
    "قصص تعليمية",
    "Kamil Kilani",
    "Arabic stories",
    "Children stories",
    "Arabic literature",
  ],
  authors: [{ name: "Kamil Kilani" }],
  creator: "Kamil Kilani",
  publisher: "Kamil Kilani Stories",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kamilkilani.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/kk.jpg",
    shortcut: "/kk.jpg",
    apple: "/kk.jpg",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://kamilkilani.com",
    siteName: "قصص كاميل كيلاني",
    title: "قصص كاميل كيلاني - Kamil Kilani Stories",
    description:
      "مجموعة من أجمل قصص كاميل كيلاني للأطفال والكبار. قصص تعليمية وترفيهية باللغة العربية.",
    images: [
      {
        url: "/kk.jpg",
        width: 1200,
        height: 630,
        alt: "قصص كاميل كيلاني",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "قصص كاميل كيلاني - Kamil Kilani Stories",
    description: "مجموعة من أجمل قصص كاميل كيلاني للأطفال والكبار",
    images: ["/kk.jpg"],
    creator: "@kamilkilani",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={` ${notoNaskhArabic.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
