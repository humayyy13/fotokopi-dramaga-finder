import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShopProvider } from "@/context/ShopContext";
import { AuthProvider } from "@/context/AuthContext";
import Providers from "./providers"; // We'll create this for QueryClient
import "@/index.css"; // Ensure this matches your CSS location

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fotokopi Dramaga Finder",
  description: "Find your nearest fotokopi in Dramaga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ShopProvider>
              <AuthProvider>
                {children}
              </AuthProvider>
            </ShopProvider>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
