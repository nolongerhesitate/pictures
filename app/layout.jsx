import { Inter } from "next/font/google";
import "./globals.css";
import { StrictMode } from "react";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pictures Management",
};


export default async function RootLayout({ children }) {
  return (
    <StrictMode>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </StrictMode>
  );
}
