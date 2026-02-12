import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    pt: "Pedro Pires Guerra Advogado | 24 Anos de Experiencia Juridica",
    en: "Pedro Pires Guerra Lawyer | 24 Years of Legal Experience",
    fr: "Pedro Pires Guerra Avocat | 24 Ans d'Experience Juridique",
    de: "Pedro Pires Guerra Rechtsanwalt | 24 Jahre Rechtserfahrung",
  };

  const descriptions: Record<string, string> = {
    pt: "Escritorio de advocacia em Carnaxide especializado em Direito Civil, Comercial, Trabalho e Familia. Primeira consulta gratuita.",
    en: "Law firm in Carnaxide specializing in Civil, Commercial, Labour and Family Law. Free first consultation.",
    fr: "Cabinet d'avocats a Carnaxide specialise en Droit Civil, Commercial, du Travail et de la Famille. Premiere consultation gratuite.",
    de: "Anwaltskanzlei in Carnaxide spezialisiert auf Zivil-, Handels-, Arbeits- und Familienrecht. Erste Beratung kostenlos.",
  };

  return {
    title: titles[locale] || titles.pt,
    description: descriptions[locale] || descriptions.pt,
    keywords:
      "advogado carnaxide, advogado oeiras, direito civil, direito comercial, direito trabalho, advogado familia, escritorio advocacia portugal",
    openGraph: {
      title: "Pedro Pires Guerra Advogado",
      description:
        "Solucoes juridicas com 24 anos de experiencia. Rigor, profissionalismo e proximidade.",
      url: "https://pedropiresguerraadvogado.pt",
      siteName: "Pedro Pires Guerra Advogado",
      locale: locale === "pt" ? "pt_PT" : locale,
      type: "website",
    },
    icons: {
      icon: "/images/favicon.png",
      apple: "/images/favicon.png",
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: "https://pedropiresguerraadvogado.pt",
      languages: {
        pt: "/pt",
        en: "/en",
        fr: "/fr",
        de: "/de",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              name: "Pedro Pires Guerra Advogado",
              url: "https://pedropiresguerraadvogado.pt",
              telephone: "+351214002158",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Edificio Neopark, Av. Tomas Ribeiro 43 1 E",
                addressLocality: "Carnaxide",
                postalCode: "2790-221",
                addressCountry: "PT",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "19:00",
              },
              priceRange: "$$",
              areaServed: { "@type": "Country", name: "Portugal" },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
