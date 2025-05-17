import { NextResponse } from "next/server";
import { nodemailerTransporter } from "@/services/nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const info = await nodemailerTransporter.sendMail({
      from: `"${name}" <${email}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `A message from ${name} via website form`,
      text: message,
    });

    return NextResponse.json({ messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
