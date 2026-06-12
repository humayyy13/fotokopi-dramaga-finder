"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, List, PlusCircle, LogOut, MapPin, Map, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState, useEffect } from "react";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace("/admin/login");
    }
  }, [loading, isAdmin, router]);

  if (loading || !isAdmin) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  const handleLogout = async () => {
    await logout();
    router.replace("/admin/login");
  };

  const links = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/shops", label: "Daftar Toko", icon: List },
    { to: "/admin/shops/create", label: "Tambah Toko", icon: PlusCircle },
    { to: "/admin/map", label: "Peta Toko", icon: Map },
  ];

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      <div className="p-4 border-b border-sidebar-border">
        <Link href="/admin" onClick={onClick} className="flex items-center gap-2 font-bold text-lg">
          <img src="/logo.png" alt="DraCopy Logo" className="w-6 h-6 object-cover rounded-full" />
          Admin Panel
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((l) => (
          <Link
            key={l.to}
            href={l.to}
            onClick={onClick}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              pathname === l.to
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            }`}
          >
            <l.icon className="h-4 w-4" />
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Link 
          href="/" 
          onClick={onClick}
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
        >
          <MapPin className="h-4 w-4" /> Lihat Website
        </Link>
        <button
          onClick={() => {
            onClick?.();
            handleLogout();
          }}
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors w-full"
        >
          <LogOut className="h-4 w-4" /> Keluar
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-sidebar text-sidebar-foreground border-b border-sidebar-border shrink-0">
        <div className="flex items-center gap-2 font-bold">
          <img src="/logo.png" alt="DraCopy Logo" className="w-6 h-6 object-cover rounded-full" />
          Admin Panel
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 -mr-2 text-sidebar-foreground">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-sidebar text-sidebar-foreground border-r-sidebar-border flex flex-col pt-6">
            <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
            <NavLinks onClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-sidebar text-sidebar-foreground shrink-0 border-r border-sidebar-border">
        <NavLinks />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto w-full max-w-full">
        {children}
      </main>
    </div>
  );
}
