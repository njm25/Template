import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";
import NavBar from "@/components/navBar/navBar";

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
          <main className="py-6 px-6 md:px-12 lg:px-60 xl:px-100">{children}</main>
        <ToastProvider />
      </body>
    </html>
  );
}
