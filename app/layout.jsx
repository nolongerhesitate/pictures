import { Inter } from "next/font/google";
import "./globals.css";
import { StrictMode } from "react";
import StoreProvider from "./store-provider";
import { DialogProvider } from "./lib/contexts/dialogContext";
import { ChakraProvider } from '@chakra-ui/react'
import SessionProvider from "./session-provider";
import { getServerSession } from "next-auth/next"


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pictures Management",
};

export default async function RootLayout({ children }) {

  const session = await getServerSession();

  return (
    <StrictMode>
      <html lang="en">
        <body className={inter.className}>
          <StoreProvider>
            <ChakraProvider >
              <SessionProvider session={session}>
                <DialogProvider>
                  {children}
                </DialogProvider>
              </SessionProvider>
            </ChakraProvider >
          </StoreProvider>
        </body>
      </html>
    </StrictMode>
  );
}
