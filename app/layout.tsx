
import "./globals.css";
import Providers from "./providers";



export const metadata = {
  title: "Pictures Management",
};


export default async function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
