import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import { StrictMode } from "react";
import StoreProvider from "./store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "R-Wallpaper Management",
};

export default function RootLayout({ children }) {
  return (
    <StrictMode>
      <html lang="en">
        <body className={inter.className}>
          <StoreProvider>
            <Providers>
              {children}
            </Providers>
          </StoreProvider>
        </body>
      </html>
    </StrictMode>
  );
}
