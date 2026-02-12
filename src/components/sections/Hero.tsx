"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with real photo */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/50" />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-16 h-16 opacity-10"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <path
            d="M32 4L4 24h12v28h32V24h12L32 4z"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 right-[12%] w-20 h-20 opacity-10"
        animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <circle cx="32" cy="16" r="6" stroke="white" strokeWidth="1.5" />
          <line x1="32" y1="22" x2="32" y2="56" stroke="white" strokeWidth="1.5" />
          <line x1="16" y1="32" x2="48" y2="32" stroke="white" strokeWidth="1.5" />
          <circle cx="16" cy="40" r="4" stroke="white" strokeWidth="1.5" />
          <circle cx="48" cy="40" r="4" stroke="white" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Badge */}
      <motion.div
        className="absolute top-24 right-4 sm:top-28 sm:right-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="text-white/80 text-xs font-medium tracking-wide">
          {t("badge")}
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-bold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-white/85 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <motion.a
            href="#agendar"
            className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold bg-gradient-to-br from-orange to-red text-white px-8 py-4 shadow-lg text-base sm:text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("cta_primary")}
          </motion.a>
          <motion.a
            href="#contactos"
            className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold border-2 border-white text-white px-8 py-4 text-base sm:text-lg hover:bg-white hover:text-text-dark transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("cta_secondary")}
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">
          {t("scroll_down")}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
