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

        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: "wasikhatri11@gmail.com",
            subject: `New Contact Form Submission from ${name}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`,
        };

        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Thank You for Contacting Me!",
            html: `<p>Hi <strong>${name}</strong>,</p>
                   <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
                   <p>For a quicker response, feel free to message me on 
                   <a href="https://wa.me/923111484053?text=Hello%20Wasi,%20I%20just%20contacted%20you%20via%20your%20portfolio." target="_blank">WhatsApp</a>.</p>
                   <p>Best regards,<br>
                   <strong>Wasi</strong><br>
                   <a href="https://muhammadwasiportfolio.vercel.app">My Portfolio</a></p>`,
        };

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: `Something went wrong: ${error.message}` }, { status: 500 });
    }
}
