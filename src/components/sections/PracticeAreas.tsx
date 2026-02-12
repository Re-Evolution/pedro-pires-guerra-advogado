"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FileText, Building2, Users, Heart, X } from "lucide-react";

const areas = [
  { key: "civil", icon: FileText },
  { key: "commercial", icon: Building2 },
  { key: "labour", icon: Users },
  { key: "family", icon: Heart },
] as const;

export function PracticeAreas() {
  const t = useTranslations("areas");
  const [openArea, setOpenArea] = useState<string | null>(null);

  return (
    <section id="areas" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {areas.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <motion.button
                  onClick={() => setOpenArea(area.key)}
                  className="w-full text-left bg-white border border-gray-light rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                  whileHover={{ y: -4 }}
                >
                  <Icon className="h-10 w-10 text-orange mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-text-dark mb-2">
                    {t(`${area.key}.title`)}
                  </h3>
                  <p className="text-text-medium text-sm leading-relaxed">
                    {t(`${area.key}.short`)}
                  </p>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-text-medium mb-2">{t("cta_text")}</p>
          <a
            href="#agendar"
            className="text-orange font-semibold hover:underline"
          >
            {t("cta_link")}
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openArea && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenArea(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenArea(null)}
                className="absolute top-4 right-4 p-1 text-text-light hover:text-text-dark transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                {areas.map((a) => {
                  if (a.key !== openArea) return null;
                  const Icon = a.icon;
                  return <Icon key={a.key} className="h-8 w-8 text-orange" />;
                })}
                <h3 className="text-2xl font-bold text-text-dark">
                  {t(`${openArea}.title`)}
                </h3>
              </div>
              <p className="text-text-medium leading-relaxed mb-6">
                {t(`${openArea}.full`)}
              </p>
              <a
                href="#agendar"
                onClick={() => setOpenArea(null)}
                className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm bg-gradient-to-br from-orange to-red text-white px-6 py-3 shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                {t("contact_about")}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
