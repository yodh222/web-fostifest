import "~/styles/globals.css";

import { type Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";



export const metadata: Metadata = {
  title: "FOSTIFEST 26",
  description: "Festival IT tahunan dari UKM FOSTI UMS",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${pressStart2P.variable} ${vt323.variable} scroll-smooth`}>
      <body className="font-vt323 bg-[#5c4033] text-white selection:bg-[#4a8a2a] selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
