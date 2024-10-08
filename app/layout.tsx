import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./features/articles/Sidebar";
import Login from "./features/login/Login";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="flex justify-end pt-10 max-w-4xl w-full mx-auto">
            <div className="mr-4 md:mr-0">
              <Login />
            </div>
          </div>
          <div className="min-h-screen p-4 pt-24 w-full flex items-start justify-center">
            <div className="fixed left-0 top-24 w-64 z-10">
              <Sidebar />
            </div>
            <div className="flex-1 max-w-4xl w-full">{children}</div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
