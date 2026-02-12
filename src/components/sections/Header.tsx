"use client";

import { useState, useEffect, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { FlagPT, FlagGB, FlagFR, FlagDE } from "@/components/ui/Flags";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/i18n/routing";

const languages: { code: Locale; label: string; flag: ReactNode }[] = [
  { code: "pt", label: "PT", flag: <FlagPT /> },
  { code: "en", label: "EN", flag: <FlagGB /> },
  { code: "fr", label: "FR", flag: <FlagFR /> },
  { code: "de", label: "DE", flag: <FlagDE /> },
];

const navLinks = [
  { key: "about", href: "#sobre" },
  { key: "areas", href: "#areas" },
  { key: "faq", href: "#faq" },
  { key: "contacts", href: "#contactos" },
];

export function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  const switchLocale = (code: Locale) => {
    router.replace(pathname, { locale: code });
    setLangOpen(false);
  };

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href={`/${locale}`} className="shrink-0">
          <Logo />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-text-medium hover:text-orange transition-colors"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen(!langOpen);
              }}
              className="flex items-center gap-2 text-sm font-medium text-text-medium hover:text-orange transition-colors px-2.5 py-1.5 rounded-md border border-transparent hover:border-gray-light"
              aria-label="Select language"
            >
              <span className="rounded-sm overflow-hidden shadow-sm">{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-light overflow-hidden min-w-[130px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLocale(lang.code)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-cream transition-colors ${
                        lang.code === locale ? "text-orange font-semibold bg-orange/5" : "text-text-dark"
                      }`}
                    >
                      <span className="rounded-sm overflow-hidden shadow-sm">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <a
            href="#agendar"
            className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm bg-gradient-to-br from-orange to-red text-white px-6 py-2.5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {t("schedule")}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-text-dark"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-light overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-medium text-text-dark hover:text-orange transition-colors py-2"
                >
                  {t(link.key)}
                </a>
              ))}

              {/* Mobile Languages */}
              <div className="flex gap-2 pt-4 border-t border-gray-light">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      switchLocale(lang.code);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm ${
                      lang.code === locale
                        ? "bg-orange/10 text-orange font-semibold"
                        : "text-text-medium hover:bg-cream"
                    }`}
                  >
                    <span className="rounded-sm overflow-hidden shadow-sm">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>

              {/* Mobile CTA */}
              <a
                href="#agendar"
                onClick={() => setMobileOpen(false)}
                className="block text-center rounded-lg font-semibold text-sm bg-gradient-to-br from-orange to-red text-white px-6 py-3 shadow-md"
              >
                {t("schedule")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
