import { NextResponse } from "next/server";

// Prepared endpoint for future Google Sheets / Make webhook integration
// For now, FAQs are served from translation files (static)
// This endpoint can be used to fetch dynamic FAQs from an external source

export async function GET() {
  // TODO: Fetch from Google Sheets via Make webhook
  // const webhookUrl = process.env.MAKE_FAQ_WEBHOOK_URL;
  // if (webhookUrl) {
  //   const res = await fetch(webhookUrl);
  //   const data = await res.json();
  //   return NextResponse.json(data);
  // }

  return NextResponse.json({
    message: "FAQ endpoint ready. Currently serving from static translation files.",
    faqs: [],
  });
}
