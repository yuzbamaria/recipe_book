import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Recipe Book",
  description: "App that helps find a recipe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
