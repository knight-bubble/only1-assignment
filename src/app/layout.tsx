import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Only1 Assignment",
  description: "Only1 Assignment - Fullstack Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
