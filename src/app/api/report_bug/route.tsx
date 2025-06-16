import { NextRequest, NextResponse } from "next/server";
import { nodemailerTransporter } from "@/services/nodemailer";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  console.log("hit post route!");

  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const file = formData.get("screenshot");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json(
      { error: "Missing or invalid form fields." },
      { status: 400 }
    );
  }

  const attachments = [];

  if (file instanceof File) {
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: file.name.replaceAll(" ", "_"),
      content: buffer,
      contentType: file.type,
    });
  }

  try {
    const info = await nodemailerTransporter.sendMail({
      from: `"${name}" <${email}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `A message from ${name} via website form`,
      text: message,
      attachments,
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
