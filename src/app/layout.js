import { Geist, Geist_Mono, League_Spartan } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";


const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Invoice Management App",
  description: "Manage your invoices efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
