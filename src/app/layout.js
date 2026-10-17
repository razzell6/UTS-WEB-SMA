import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

export const metadata = {
  title: "SMA Negeri 1 Temanggung",
  description: "Website Resmi SMA Negeri 1 Temanggung",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}