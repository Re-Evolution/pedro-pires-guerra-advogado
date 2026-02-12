"use client";

import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/Logo";
import { Scale, Linkedin, Facebook } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");

  const navLinks = [
    { label: navT("areas"), href: "#areas" },
    { label: navT("faq"), href: "#faq" },
    { label: navT("contacts"), href: "#contactos" },
    { label: navT("schedule"), href: "#agendar" },
  ];

  return (
    <footer className="bg-[#2D2D2D] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="h-6 w-6 text-orange" strokeWidth={1.8} />
              <span className="text-lg font-bold text-white">
                Pedro Pires Guerra
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              {t("tagline")}
            </p>
            <p className="text-xs text-gray-500">{t("oa")}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              {t("nav_title")}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              {t("contacts_title")}
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <a href={CONTACT.phoneLink} className="hover:text-orange transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailLink} className="hover:text-orange transition-colors break-all">
                  {CONTACT.email}
                </a>
              </li>
              <li className="leading-relaxed">{t("address_short")}</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              {t("social_title")}
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-orange/20 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-orange/20 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {t("copyright")}</p>
          <div className="flex gap-4">
            <a
              href={`/${locale}/politica-privacidade`}
              className="hover:text-orange transition-colors"
            >
              {t("privacy")}
            </a>
            <span>|</span>
            <a
              href={`/${locale}/termos-de-utilizacao`}
              className="hover:text-orange transition-colors"
            >
              {t("terms")}
            </a>
          </div>
          <p>
            {t("developed_by")}{" "}
            <a
              href="https://re-evolution.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange hover:underline"
            >
              Re-Evolution
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
