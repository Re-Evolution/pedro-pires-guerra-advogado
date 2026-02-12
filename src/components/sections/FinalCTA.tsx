"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export function FinalCTA() {
  const t = useTranslations("final_cta");

  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-orange/10 via-red/5 to-orange/10 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-[44px] font-bold text-text-dark mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-text-medium mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="#agendar"
            className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold bg-gradient-to-br from-orange to-red text-white px-8 py-4 shadow-lg text-base hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("cta_primary")}
          </motion.a>
          <motion.a
            href={CONTACT.whatsappPrefilledLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold bg-whatsapp text-white px-8 py-4 shadow-lg text-base hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="h-5 w-5" />
            {t("cta_whatsapp")}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
