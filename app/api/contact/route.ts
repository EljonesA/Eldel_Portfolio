import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "kajujufaith55@gmail.com",
        pass: process.env.EMAIL_PASSWORD, // We'll set this up in the next step
      }
    })

    const mailOptions = {
      from: `"Portfolio Contact" <kajujufaith55@gmail.com>`,
      to: "kajujufaith55@gmail.com",
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333;">New Contact Message</h2>
          <p style="font-size: 16px; color: #555;">You have received a new message from your portfolio website.</p>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f9f9f9;">
              <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Name</th>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Email</th>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Message</th>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${message}</td>
            </tr>
          </table>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 })
  }
}