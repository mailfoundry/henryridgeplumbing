import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const HENRY_EMAIL = "info@henryridgeplumbing.co.uk";
const FROM = "Henry Ridge Plumbing <noreply@henryridgeplumbing.co.uk>";

export async function sendQuoteNotificationToHenry(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  address?: string;
  message: string;
  id: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: HENRY_EMAIL,
    subject: `New quote request — ${data.service} — ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0A1A2F; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0; font-size: 20px;">New Quote Request</h2>
          <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0; font-size: 14px;">Henry Ridge Plumbing</p>
        </div>
        <div style="background: #F2F4F7; padding: 32px; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #4A5A72; font-size: 14px; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #0A1A2F;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #4A5A72; font-size: 14px;">Phone</td><td style="padding: 8px 0; font-weight: 600; color: #0A1A2F;"><a href="tel:${data.phone}" style="color: #1E63D6;">${data.phone}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #4A5A72; font-size: 14px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #1E63D6;">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #4A5A72; font-size: 14px;">Service</td><td style="padding: 8px 0; font-weight: 600; color: #0A1A2F;">${data.service}</td></tr>
            ${data.address ? `<tr><td style="padding: 8px 0; color: #4A5A72; font-size: 14px;">Address</td><td style="padding: 8px 0; color: #0A1A2F;">${data.address}</td></tr>` : ""}
          </table>
          <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 6px; border-left: 3px solid #1E63D6;">
            <p style="margin: 0; color: #4A5A72; font-size: 13px; margin-bottom: 6px;">Message</p>
            <p style="margin: 0; color: #0A1A2F;">${data.message}</p>
          </div>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="display: inline-block; margin-top: 24px; background: #1E63D6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">View in Admin →</a>
        </div>
      </div>
    `,
  });
}

export async function sendQuoteConfirmationToCustomer(data: {
  name: string;
  email: string;
  service: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `Quote request received — Henry Ridge Plumbing`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0A1A2F; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0; font-size: 20px;">Thanks, ${data.name}</h2>
          <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0; font-size: 14px;">Henry Ridge Plumbing — Staffordshire</p>
        </div>
        <div style="background: #F2F4F7; padding: 32px; border-radius: 0 0 8px 8px;">
          <p style="color: #0A1A2F; font-size: 16px; line-height: 1.6;">
            Your quote request for <strong>${data.service}</strong> has been received. Henry will be in touch within a few hours — usually the same day.
          </p>
          <p style="color: #4A5A72; font-size: 14px; line-height: 1.6;">
            If it's urgent or you haven't heard back within 24 hours, give Henry a call directly:
          </p>
          <a href="tel:+447306800847" style="display: inline-block; background: #1E63D6; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 18px; margin: 8px 0;">07306 800847</a>
          <hr style="border: none; border-top: 1px solid #D1D9E6; margin: 28px 0;" />
          <p style="color: #4A5A72; font-size: 13px; margin: 0;">Henry Ridge Plumbing · Staffordshire · <a href="mailto:info@henryridgeplumbing.co.uk" style="color: #1E63D6;">info@henryridgeplumbing.co.uk</a></p>
        </div>
      </div>
    `,
  });
}
