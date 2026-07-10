import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";

export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (parsed.data.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  const recipient = process.env.ENQUIRY_RECIPIENT_EMAIL;
  const emailProviderKey = process.env.RESEND_API_KEY;

  if (!recipient || !emailProviderKey) {
    return NextResponse.json({
      ok: true,
      mode: "development-fallback",
    });
  }

  return NextResponse.json({
    ok: true,
    mode: "email-provider-ready",
  });
}
