import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh-arabic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "قصص كاميل كيلاني",
  description: "قصص كاميل كيلاني",
  icons: {
    icon: "/kk.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${notoNaskhArabic.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
