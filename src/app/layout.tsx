import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedro Pires Guerra Advogado",
  description: "Escritório de advocacia em Carnaxide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
