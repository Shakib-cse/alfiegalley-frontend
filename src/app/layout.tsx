import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

// Load Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // include common weights
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "ESSEX ESTUARY RADIO",
  description: "Stream live radio, stay informed with breaking news, and experience music and culture – all in one premium destination.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("font-sans", geist.variable)}
    >
      <body
        className={`${poppins.variable} font-sans antialiased bg-foreground/5 text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
