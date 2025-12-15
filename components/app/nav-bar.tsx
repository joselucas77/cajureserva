"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">Caju</span>
          <span className="text-2xl font-bold text-foreground">Reserva</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link
            href="#funcionalidades"
            className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
          >
            Funcionalidades
          </Link>
          <Link
            href="#como-funciona"
            className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
          >
            Como funciona
          </Link>
          <Link
            href="#espacos"
            className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
          >
            Espaços
          </Link>
          <Link
            href="#planos"
            className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
          >
            Planos
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
          >
            FAQ
          </Link>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="outline"
            asChild
            className="border-slate-300 hover:bg-slate-50 bg-transparent"
          >
            <Link href="/login">Entrar</Link>
          </Button>
          <Button
            asChild
            className="bg-orange-600 hover:bg-orange-700 transition-all duration-300"
          >
            <Link href="#planos">Começar agora</Link>
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
            <Link
              href="#funcionalidades"
              className="text-sm font-medium text-slate-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Funcionalidades
            </Link>
            <Link
              href="#como-funciona"
              className="text-sm font-medium text-slate-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Como funciona
            </Link>
            <Link
              href="#espacos"
              className="text-sm font-medium text-slate-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Espaços
            </Link>
            <Link
              href="#planos"
              className="text-sm font-medium text-slate-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Planos
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-slate-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent"
              >
                <Link href="/login">Entrar</Link>
              </Button>
              <Button
                asChild
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                <Link href="#planos">Começar agora</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
