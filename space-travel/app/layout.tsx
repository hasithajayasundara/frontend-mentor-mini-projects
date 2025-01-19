import type { Metadata } from "next";
import "../css/main.css";
import { Layout } from "@/components/layout";

export const metadata: Metadata = {
  title: "Space travel",
  description: "Space travel app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Layout>
        {children}
      </Layout>
    </html>
  );
}
