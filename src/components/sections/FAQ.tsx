"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Search, Plus, Minus, X } from "lucide-react";

const FAQ_KEYS = [
  "civil_01", "civil_02", "civil_03", "civil_04", "civil_05",
  "commercial_01", "commercial_02", "commercial_03", "commercial_04", "commercial_05",
  "labour_01", "labour_02", "labour_03", "labour_04", "labour_05",
  "family_01", "family_02", "family_03", "family_04", "family_05",
] as const;

const CATEGORIES = ["civil", "commercial", "labour", "family"] as const;

function getCategoryFromKey(key: string) {
  return key.split("_")[0];
}

export function FAQ() {
  const t = useTranslations("faq");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("civil");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    return FAQ_KEYS.filter((key) => {
      const cat = getCategoryFromKey(key);
      if (search.trim()) {
        const q = t(`questions.${key}.q`).toLowerCase();
        const a = t(`questions.${key}.a`).toLowerCase();
        const term = search.toLowerCase();
        return q.includes(term) || a.includes(term);
      }
      return cat === activeCategory;
    });
  }, [search, activeCategory, t]);

  return (
    <section id="faq" className="py-20 md:py-28 bg-gradient-to-b from-cream to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-light" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search_placeholder")}
            className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-gray-light bg-white text-text-dark placeholder:text-text-light focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-text-dark"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenItem(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-orange text-white shadow-sm"
                  : "bg-white text-text-medium border border-gray-light hover:border-orange/40"
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-text-light py-8">
              {t("cta_text")}
            </p>
          ) : (
            filteredFaqs.map((key) => {
              const isOpen = openItem === key;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  className="border border-gray-light rounded-xl overflow-hidden bg-white"
                >
                  <button
                    onClick={() => setOpenItem(isOpen ? null : key)}
                    className={`w-full flex items-center justify-between p-5 text-left transition-colors ${
                      isOpen ? "bg-cream" : "hover:bg-cream/50"
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm md:text-base font-semibold text-text-dark pr-4">
                      {t(`questions.${key}.q`)}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0"
                    >
                      {isOpen ? (
                        <Minus className="h-5 w-5 text-orange" />
                      ) : (
                        <Plus className="h-5 w-5 text-text-light" />
                      )}
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 text-text-medium text-sm leading-relaxed">
                          {t(`questions.${key}.a`)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-text-medium mb-3">{t("cta_text")}</p>
          <a
            href="#agendar"
            className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm bg-gradient-to-br from-orange to-red text-white px-6 py-3 shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            {t("cta_button")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
