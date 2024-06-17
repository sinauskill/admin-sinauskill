import "./globals.css";

import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";

import GoogleOAuthProvider from "@/provider/google-oauth-provider";

export const metadata: Metadata = {
  title: "Admin Portal - SinauSkill",
  description: "Indonesia's Premier Education Startup",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning={true}
      >
        <GoogleOAuthProvider>
            {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
