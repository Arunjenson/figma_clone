import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Room from './Room';
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ['400', '600', '700'],
  variable:'--font-work-sans'
});

export const metadata: Metadata = {
  title: "Figma Clone",
  description: "A design Collaboration system using LiveBlocks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className} bg-primary-grey-200`}>
        <Room>{children}</Room>
       </body>
    </html>
  );
}
