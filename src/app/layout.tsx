import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { UserProvider } from "@/hooks/useUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barber App",
  description: "Developed and designed by benitezvalentin046@gmail.com",
};

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
        <UserProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </UserProvider>
      </body>
    </html>
  );
}
