"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  ClipboardList,
  Mail,
  CalendarDays,
  Phone,
  Handshake,
  FileText,
  CheckCircle2,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { CONTACT } from "@/lib/constants";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  area: string;
  clientType: string;
  urgency: string;
  description: string;
  prefWhatsapp: boolean;
  prefEmail: boolean;
  prefPhone: boolean;
  privacy: boolean;
}

const steps = [
  { icon: Phone, titleKey: "step1_title", textKey: "step1_text" },
  { icon: Handshake, titleKey: "step2_title", textKey: "step2_text" },
  { icon: FileText, titleKey: "step3_title", textKey: "step3_text" },
  { icon: CheckCircle2, titleKey: "step4_title", textKey: "step4_text" },
];

export function ContactHub() {
  const t = useTranslations("contact_hub");
  const [openPanel, setOpenPanel] = useState<number | null>(null);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const togglePanel = (idx: number) => {
    setOpenPanel(openPanel === idx ? null : idx);
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState("loading");
    try {
      const res = await fetch("/api/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          area: data.area,
          clientType: data.clientType,
          urgency: data.urgency,
          description: data.description,
          contactPreferences: {
            whatsapp: data.prefWhatsapp,
            email: data.prefEmail,
            phone: data.prefPhone,
          },
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  };

  const panels = [
    {
      icon: ClipboardList,
      titleKey: "panel1_title",
      descKey: "panel1_desc",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
          {steps.map((step, i) => {
            const StepIcon = step.icon;
            return (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full bg-orange/10 flex items-center justify-center mx-auto mb-3">
                  <StepIcon className="h-6 w-6 text-orange" />
                </div>
                <div className="text-2xl font-bold text-orange/30 mb-1">
                  {i + 1}
                </div>
                <h4 className="font-semibold text-text-dark mb-1">
                  {t(step.titleKey)}
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  {t(step.textKey)}
                </p>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      icon: Mail,
      titleKey: "panel2_title",
      descKey: "panel2_desc",
      content: (
        <div className="max-w-xl mx-auto py-4">
          {submitState === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
              <p className="text-text-dark font-semibold text-lg">
                {t("form_success")}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1.5">
                  {t("form_name")} *
                </label>
                <input
                  {...register("name", { required: t("form_required") })}
                  placeholder={t("form_name_placeholder")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-light bg-white text-text-dark placeholder:text-text-light focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                />
                {errors.name && (
                  <p className="text-error text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1.5">
                    {t("form_email")} *
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: t("form_required"),
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t("form_invalid_email"),
                      },
                    })}
                    placeholder={t("form_email_placeholder")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-light bg-white text-text-dark placeholder:text-text-light focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                  />
                  {errors.email && (
                    <p className="text-error text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1.5">
                    {t("form_phone")} *
                  </label>
                  <input
                    type="tel"
                    {...register("phone", {
                      required: t("form_required"),
                      pattern: {
                        value: /^(\+351)?[0-9\s]{9,15}$/,
                        message: t("form_invalid_phone"),
                      },
                    })}
                    placeholder={t("form_phone_placeholder")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-light bg-white text-text-dark placeholder:text-text-light focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                  />
                  {errors.phone && (
                    <p className="text-error text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Area & Client Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1.5">
                    {t("form_area")} *
                  </label>
                  <select
                    {...register("area", { required: t("form_required") })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-light bg-white text-text-dark focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                    defaultValue=""
                  >
                    <option value="" disabled>---</option>
                    {["civil", "commercial", "labour", "family", "other"].map((opt) => (
                      <option key={opt} value={opt}>
                        {t(`form_area_options.${opt}`)}
                      </option>
                    ))}
                  </select>
                  {errors.area && (
                    <p className="text-error text-xs mt-1">{errors.area.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1.5">
                    {t("form_client_type")}
                  </label>
                  <select
                    {...register("clientType")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-light bg-white text-text-dark focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                    defaultValue=""
                  >
                    <option value="">---</option>
                    <option value="particular">{t("form_client_particular")}</option>
                    <option value="company">{t("form_client_company")}</option>
                  </select>
                </div>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                  {t("form_urgency")} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { value: "low", label: t("form_urgency_low"), color: "border-success/40 bg-success/5" },
                    { value: "medium", label: t("form_urgency_medium"), color: "border-warning/40 bg-warning/5" },
                    { value: "high", label: t("form_urgency_high"), color: "border-error/40 bg-error/5" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer text-xs leading-tight hover:shadow-sm transition-shadow ${opt.color}`}
                    >
                      <input
                        type="radio"
                        value={opt.value}
                        {...register("urgency", { required: t("form_required") })}
                        className="accent-orange"
                      />
                      <span className="text-text-dark">{opt.label}</span>
                    </label>
                  ))}
                </div>
                {errors.urgency && (
                  <p className="text-error text-xs mt-1">{errors.urgency.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1.5">
                  {t("form_description")} *
                </label>
                <textarea
                  {...register("description", {
                    required: t("form_required"),
                    maxLength: 500,
                  })}
                  maxLength={500}
                  rows={4}
                  placeholder={t("form_description_placeholder")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-light bg-white text-text-dark placeholder:text-text-light focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 resize-none"
                />
              </div>

              {/* Contact Preferences */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                  {t("form_contact_pref")}
                </label>
                <div className="space-y-2">
                  {[
                    { key: "prefWhatsapp", label: t("form_pref_whatsapp") },
                    { key: "prefEmail", label: t("form_pref_email") },
                    { key: "prefPhone", label: t("form_pref_phone") },
                  ].map((pref) => (
                    <label key={pref.key} className="flex items-center gap-2 text-sm text-text-medium cursor-pointer">
                      <input
                        type="checkbox"
                        {...register(pref.key as keyof ContactFormData)}
                        className="accent-orange rounded"
                      />
                      {pref.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Privacy */}
              <div>
                <label className="flex items-start gap-2 text-sm text-text-medium cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("privacy", { required: t("form_required") })}
                    className="accent-orange mt-0.5"
                  />
                  <span>
                    {t("form_privacy")}{" "}
                    <a
                      href="/politica-privacidade"
                      target="_blank"
                      className="text-orange hover:underline"
                    >
                      {t("form_privacy_link")}
                    </a>
                  </span>
                </label>
                {errors.privacy && (
                  <p className="text-error text-xs mt-1">{errors.privacy.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitState === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg font-semibold bg-gradient-to-br from-orange to-red text-white px-8 py-3.5 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-60 disabled:scale-100"
              >
                {submitState === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("form_sending")}
                  </>
                ) : (
                  t("form_submit")
                )}
              </button>

              {submitState === "error" && (
                <p className="text-error text-sm text-center">{t("form_error")}</p>
              )}
            </form>
          )}
        </div>
      ),
    },
    {
      icon: CalendarDays,
      titleKey: "panel3_title",
      descKey: "panel3_desc",
      content: (
        <div className="py-4">
          <iframe
            src={CONTACT.calendly}
            width="100%"
            height="700"
            frameBorder="0"
            title={t("panel3_title")}
            className="rounded-lg"
          />
        </div>
      ),
    },
  ];

  return (
    <section id="agendar" className="py-20 md:py-28 bg-gradient-to-b from-white to-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="space-y-4">
          {panels.map((panel, idx) => {
            const PanelIcon = panel.icon;
            const isOpen = openPanel === idx;
            return (
              <div
                key={idx}
                className="border border-gray-light rounded-xl overflow-hidden bg-white shadow-sm"
              >
                <button
                  onClick={() => togglePanel(idx)}
                  className={`w-full flex items-center gap-4 p-5 md:p-6 text-left transition-colors ${
                    isOpen ? "bg-orange/5" : "hover:bg-cream/50"
                  }`}
                  aria-expanded={isOpen}
                >
                  <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                    <PanelIcon className="h-5 w-5 text-orange" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-text-dark">
                      {t(panel.titleKey)}
                    </h3>
                    <p className="text-sm text-text-medium truncate">
                      {t(panel.descKey)}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-text-light" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-5 md:px-6 pb-6 border-t border-gray-light pt-4">
                        {panel.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
