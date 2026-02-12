export const CONTACT = {
  name: "Pedro Pires Guerra Advogado",
  address: {
    building: "Edifício Neopark",
    street: "Av. Tomás Ribeiro 43, 1.º E",
    postal: "2790-221 Carnaxide",
  },
  phone: "+351 214 002 158",
  phoneLink: "tel:+351214002158",
  whatsapp: "+351 969 063 633",
  whatsappLink: "https://wa.me/351969063633",
  whatsappPrefilledLink:
    "https://wa.me/351969063633?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20jur%C3%ADdica.",
  email: "carvalhovalecarlos@gmail.com",
  emailLink: "mailto:carvalhovalecarlos@gmail.com",
  googleMaps: "https://maps.app.goo.gl/S6FyYWAFMSxMAkM58",
  googleMapsEmbed:
    "https://www.google.com/maps?q=Edif%C3%ADcio+Neopark,+Av.+Tom%C3%A1s+Ribeiro+43,+2790-221+Carnaxide,+Portugal&z=16&output=embed",
  oaNumber: "50726L",
  hours: {
    days: "Segunda a Sexta",
    time: "09:00 - 19:00",
  },
  calendly: "https://calendly.com/carvalhovalecarlos/30min",
} as const;

export const CLIENTS = [
  { name: "Trivalor SGPS, SA", highlight: true },
  { name: "Construtora Silva & Filhos, Lda", highlight: false },
  { name: "TechInova Solutions", highlight: false },
  { name: "Grupo Empresarial Atlantis", highlight: false },
] as const;

export const FAQ_CATEGORIES = [
  "all",
  "civil",
  "commercial",
  "labour",
  "family",
] as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[number];
