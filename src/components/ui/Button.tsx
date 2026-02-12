"use client";

import { motion } from "framer-motion";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  href?: string;
  target?: string;
  className?: string;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange/50 disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-orange to-red text-white px-8 py-3.5 shadow-md hover:shadow-lg",
  secondary:
    "border-2 border-white text-white px-8 py-3.5 hover:bg-white hover:text-text-dark",
  ghost: "text-orange hover:underline px-4 py-2",
  whatsapp:
    "bg-whatsapp text-white px-8 py-3.5 shadow-md hover:shadow-lg hover:brightness-90",
};

export function Button({
  variant = "primary",
  children,
  href,
  target,
  className = "",
  ...props
}: ButtonProps) {
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={styles}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={styles}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      {...(props as object)}
    >
      {children}
    </motion.button>
  );
}
