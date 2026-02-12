"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  className = "",
  light = false,
}: SectionTitleProps) {
  return (
    <motion.div
      className={`text-center mb-12 md:mb-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <h2
        className={`text-3xl md:text-4xl lg:text-[42px] font-bold mb-4 ${
          light ? "text-white" : "text-text-dark"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto ${
            light ? "text-white/80" : "text-text-medium"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
