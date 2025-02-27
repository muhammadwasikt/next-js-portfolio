import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "wasikhatri11@gmail.com",
            subject: `New Contact Form Submission from ${name}`,
            html: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Something went wrong: ${error.message}` }, { status: 500 });
    }
}
