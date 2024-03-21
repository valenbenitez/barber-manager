'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { UserProvider } from "@/hooks/useUser";
import { CortesProvider } from "@/hooks/useCortes";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&family=Raleway:wght@400;700;800&display=swap"
        />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <UserProvider>
            <AuthProvider>
              <CortesProvider>
                {children}
              </CortesProvider>
            </AuthProvider>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
