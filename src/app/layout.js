import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/store/Providers";

export const metadata = { title: "Mobiversite Shop", description: "Next.js 15 demo" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="container py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
