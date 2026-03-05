import { NextRequest, NextResponse } from "next/server";

interface ContactFormBody {
  name: string;
  email: string;
  phone: string;
  area: string;
  clientType?: string;
  urgency: string;
  description: string;
  contactPreferences?: {
    whatsapp?: boolean;
    email?: boolean;
    phone?: boolean;
  };
  timestamp: string;
}

function normalizePortuguesePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00351")) return digits.slice(2);
  if (digits.startsWith("351") && digits.length === 12) return digits;
  if (digits.length === 9 && /^[29]/.test(digits)) return `351${digits}`;
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormBody = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.area || !body.urgency || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate and normalize phone to E.164 digits (e.g. 351969063633)
    const normalizedPhone = normalizePortuguesePhone(body.phone);
    if (!normalizedPhone) {
      return NextResponse.json(
        { error: "Invalid phone format" },
        { status: 400 }
      );
    }

    // Send to Make.com webhook
    const webhookUrl = process.env.MAKE_CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      const makeResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact-form",
          ...body,
          phone: normalizedPhone,
        }),
      });

      if (!makeResponse.ok) {
        console.error("Make.com webhook failed:", makeResponse.status);
      }
    } else {
      console.warn("MAKE_CONTACT_WEBHOOK_URL not configured - submission logged only");
      console.log("Contact form submission:", JSON.stringify(body, null, 2));
    }

    return NextResponse.json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
