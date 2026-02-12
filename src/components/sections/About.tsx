"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Star, Quote, ExternalLink } from "lucide-react";
import { CLIENTS, CONTACT } from "@/lib/constants";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="sobre" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Image Side */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/images/lawyer-photo.jpg"
                  alt="Dr. Pedro Pires Guerra - Advogado"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange/20 to-red/20 rounded-2xl -z-10" />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-6">
              {t("title")}
            </h2>

            <p className="text-text-medium leading-relaxed mb-4">{t("p1")}</p>
            <p className="text-text-medium leading-relaxed mb-4">
              {t("p2")}
            </p>
            <p className="text-text-medium leading-relaxed mb-4">{t("p3")}</p>

            {/* Clients List */}
            <ul className="space-y-1.5 mb-8 ml-1">
              {CLIENTS.map((client) => (
                <li
                  key={client.name}
                  className={`flex items-center gap-2 text-sm ${
                    client.highlight
                      ? "font-bold text-text-dark"
                      : "text-text-medium"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                  {client.name}
                </li>
              ))}
            </ul>

            {/* Testimonial Card */}
            <div className="bg-gradient-to-r from-orange/5 to-red/5 border-l-4 border-orange rounded-xl p-6 md:p-8">
              <Quote className="h-8 w-8 text-orange/40 mb-3" />
              <p className="text-text-dark italic text-lg leading-relaxed mb-4">
                &ldquo;{t("testimonial_text")}&rdquo;
              </p>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="font-bold text-text-dark">
                    {t("testimonial_author")}
                  </p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-orange text-orange"
                      />
                    ))}
                  </div>
                </div>
                <a
                  href={CONTACT.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-orange hover:underline"
                >
                  {t("testimonial_link")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
