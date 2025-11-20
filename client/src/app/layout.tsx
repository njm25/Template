import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";

export const metadata: Metadata = {
  title: "njm25 Template",
  description: "A basic template for a full-stack application",
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
        <ToastProvider />
      </body>
    </html>
  );
}
