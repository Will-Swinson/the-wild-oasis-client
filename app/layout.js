import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import Header from "@/app/_components/Header";

import styles from "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s - The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="mx-auto max-w-7xl w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
