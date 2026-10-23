import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 10000) : "";
    if (!name || !email || !message) return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const recipient = process.env.CONTACT_EMAIL || user;
    if (!user || !pass || !recipient) return NextResponse.json({ error: "Contact email is not configured on the server." }, { status: 503 });
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
    await transporter.sendMail({
      from: user, to: recipient, replyTo: email,
      subject: "New portfolio message from " + name,
      html: "<p><strong>Name:</strong> " + safeName + "</p><p><strong>Email:</strong> " + safeEmail + "</p><p><strong>Message:</strong><br>" + safeMessage + "</p>"
    });
    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch {
    return NextResponse.json({ error: "Unable to send your message right now. Please try again later." }, { status: 500 });
  }
}
