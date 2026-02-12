"use client";

import { Scale } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Scale className="h-7 w-7 text-orange" strokeWidth={1.8} />
      <div className="leading-tight">
        <span className="text-lg font-bold text-text-dark">Pedro Pires Guerra</span>
        <span className="block text-[11px] font-medium tracking-wider text-text-medium uppercase">
          Advogado
        </span>
      </div>
    </div>
  );
}
