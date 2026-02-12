"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  ExternalLink,
} from "lucide-react";
import { CONTACT } from "@/lib/constants";

export function Location() {
  const t = useTranslations("location");

  const contactItems = [
    {
      icon: MapPin,
      label: t("address_label"),
      content: (
        <div className="text-sm leading-relaxed">
          <p>{t("address_line1")}</p>
          <p>{t("address_line2")}</p>
          <p>{t("address_line3")}</p>
        </div>
      ),
    },
    {
      icon: Phone,
      label: t("phone_label"),
      content: (
        <a
          href={CONTACT.phoneLink}
          className="text-sm font-semibold text-text-dark hover:text-orange transition-colors"
        >
          {CONTACT.phone}
        </a>
      ),
    },
    {
      icon: MessageCircle,
      label: t("whatsapp_label"),
      content: (
        <a
          href={CONTACT.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-whatsapp hover:underline"
        >
          {CONTACT.whatsapp}
          <span className="text-xs font-normal text-text-light">
            {t("whatsapp_text")}
          </span>
        </a>
      ),
    },
    {
      icon: Mail,
      label: t("email_label"),
      content: (
        <a
          href={CONTACT.emailLink}
          className="text-sm font-semibold text-text-dark hover:text-orange transition-colors break-all"
        >
          {CONTACT.email}
        </a>
      ),
    },
    {
      icon: Clock,
      label: t("hours_label"),
      content: (
        <div className="text-sm">
          <p className="font-semibold text-text-dark">
            {t("hours_days")}
          </p>
          <p className="text-text-dark">{t("hours_time")}</p>
          <p className="text-text-light text-xs mt-1">{t("hours_closed")}</p>
        </div>
      ),
    },
  ];

  return (
    <section id="contactos" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Map */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-md h-[350px] md:h-[450px] bg-gray-light">
              <iframe
                src={CONTACT.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location"
              />
            </div>
            <div className="flex gap-4 mt-4">
              <a
                href={CONTACT.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-orange hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {t("open_maps")}
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=Edificio+Neopark+Av+Tomas+Ribeiro+43+Carnaxide`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-orange hover:underline"
              >
                <MapPin className="h-3.5 w-3.5" />
                {t("get_directions")}
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white border border-gray-light rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-orange" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-light uppercase tracking-wide mb-1">
                        {item.label}
                      </p>
                      {item.content}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a
                href="#agendar"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm bg-gradient-to-br from-orange to-red text-white px-4 py-3 shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                {t("title")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
