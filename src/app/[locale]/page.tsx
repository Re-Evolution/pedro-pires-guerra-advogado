import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { FAQ } from "@/components/sections/FAQ";
import { About } from "@/components/sections/About";
import { ContactHub } from "@/components/sections/ContactHub";
import { Location } from "@/components/sections/Location";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header locale={locale} />
      <main>
        <Hero />
        <About />
        <PracticeAreas />
        <FAQ />
        <ContactHub />
        <Location />
        <FinalCTA />
      </main>
      <Footer locale={locale} />
      <CookieBanner />
    </>
  );
}
