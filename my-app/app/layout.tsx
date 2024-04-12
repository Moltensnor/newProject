
import { Inter } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from "./components/navbar/page";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Navbar />
          <div className="pt-24">
            {children}
          </div>
          <footer className="bg-void pb-5 bottom-0">
            <div className="max-w-screen-xl px-4 pt-8 mx-auto sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex justify-center text-teal-300 sm:justify-start">

                </div>
                <p className="mt-4 text-sm text-center text-stark lg:text-right lg:mt-0">
                  T&C &nbsp; Career &nbsp; Privacy & Policy &nbsp; Developers
                </p>
              </div>
            </div>
          </footer>
        </body>
      </UserProvider>
    </html >
  );
}
