import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";
import NavBar from "@/components/navBar";

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
        <NavBar />
        <main className="pt-4 px-120">{children}</main>
        <ToastProvider />
      </body>
    </html>
  );
}
