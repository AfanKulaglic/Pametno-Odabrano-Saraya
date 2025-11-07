import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Pameto odabrano",
  description: "Next.js app sa Navbarom i Footerom",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
