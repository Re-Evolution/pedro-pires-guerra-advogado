"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = (value: string) => {
    localStorage.setItem("cookie-consent", value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-light p-5 md:p-6 flex flex-col md:flex-row items-center gap-4">
            <p className="text-sm text-text-medium flex-1 leading-relaxed">
              {t("text")}
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => accept("necessary")}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-light text-text-medium hover:bg-cream transition-colors"
              >
                {t("necessary")}
              </button>
              <button
                onClick={() => accept("all")}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-br from-orange to-red text-white shadow-sm hover:shadow-md transition-all"
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
