import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Mobiversite Shop",
  description: "Simple e-commerce demo (Next.js 15, JS)"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
