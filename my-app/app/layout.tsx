import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Navbar from "./components/navbar/page";
import Footer from "./components/footer/page";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <NextUIProvider>
            <Navbar />
            <div className="min-h-[77.2vh]">{children}</div>
            <Footer />
          </NextUIProvider>
        </body>
      </UserProvider>
    </html>
  );
}
