"use client";

import { useState } from "react";
import { Building2, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const Links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/reservations", label: "Reservas" },
  { href: "/admin/spaces", label: "Espaços" },
  { href: "/admin/reports", label: "Relatórios" },
];

export default function NavbarAdmin() {
  const currentPath = usePathname();
  const isActive = (path: string) => currentPath === path;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-primary">Caju</span>
          <span className="text-2xl font-bold text-foreground">Reserva</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {Links.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={`text-sm font-medium pb-1 ${
                isActive(href)
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-slate-600 hover:text-orange-600 transition-colors"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center lg:flex">
          <Button
            variant="outline"
            className="border-slate-300 hover:bg-slate-50 bg-transparent"
            asChild
          >
            <Link href="/logout">Sair</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden rounded-md p-2 text-slate-700 hover:bg-slate-100"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {Links.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-medium text-orange-600"
              >
                {label}
              </Link>
            ))}
            <div className="flex flex-col pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                asChild
              >
                <Link href="/logout">Sair</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
