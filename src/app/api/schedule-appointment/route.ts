import { NextRequest, NextResponse } from "next/server";

interface AppointmentBody {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  format: "presencial" | "online";
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: AppointmentBody = await request.json();

    if (!body.name || !body.email || !body.phone || !body.date || !body.time || !body.format) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send to Make.com webhook
    const webhookUrl = process.env.MAKE_APPOINTMENT_WEBHOOK_URL;
    if (webhookUrl) {
      const makeResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "schedule-appointment",
          ...body,
        }),
      });

      if (!makeResponse.ok) {
        console.error("Make.com webhook failed:", makeResponse.status);
      }
    } else {
      console.warn("MAKE_APPOINTMENT_WEBHOOK_URL not configured - submission logged only");
      console.log("Appointment submission:", JSON.stringify(body, null, 2));
    }

    return NextResponse.json({ success: true, message: "Appointment scheduled successfully" });
  } catch (error) {
    console.error("Appointment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
