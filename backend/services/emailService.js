const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

async function sendEmail({ to, subject, html }) {
  try {
    const t = getTransporter();
    await t.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    console.log(`📧 Email sent to ${to}: ${subject}`);
    return true;
  } catch (err) {
    console.error('Email error:', err.message);
    return false;
  }
}

async function sendWelcomeEmail(email, username) {
  return sendEmail({
    to: email,
    subject: '🐝 Welcome to HEKA ProjectHive!',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:linear-gradient(135deg,#1a1a2e,#16213e);color:#fff;padding:40px;border-radius:16px;">
        <h1 style="color:#a78bfa;">Welcome, ${username}! 🎉</h1>
        <p>Your HEKA ProjectHive account has been created successfully.</p>
        <p>Browse engineering projects, place orders, and accelerate your academic journey.</p>
        <hr style="border-color:#4c1d95;"/>
        <p style="color:#94a3b8;font-size:12px;">HEKA ProjectHive — Engineering Project Marketplace</p>
      </div>
    `,
  });
}

async function sendOrderConfirmation(email, order) {
  return sendEmail({
    to: email,
    subject: `🛒 Order Confirmed — ${order.ProjectTitle}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:linear-gradient(135deg,#1a1a2e,#16213e);color:#fff;padding:40px;border-radius:16px;">
        <h1 style="color:#a78bfa;">Order Confirmed! ✅</h1>
        <p><strong>Project:</strong> ${order.ProjectTitle}</p>
        <p><strong>Price:</strong> ₹${order.Price}</p>
        <p><strong>Order ID:</strong> ${order.OrderID}</p>
        <p>We'll notify you once your project is ready for delivery.</p>
        <hr style="border-color:#4c1d95;"/>
        <p style="color:#94a3b8;font-size:12px;">HEKA ProjectHive</p>
      </div>
    `,
  });
}

async function sendDeliveryNotification(email, order) {
  return sendEmail({
    to: email,
    subject: `📦 Project Delivered — ${order.ProjectTitle}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:linear-gradient(135deg,#1a1a2e,#16213e);color:#fff;padding:40px;border-radius:16px;">
        <h1 style="color:#a78bfa;">Project Delivered! 🚀</h1>
        <p><strong>Project:</strong> ${order.ProjectTitle}</p>
        <p>Your project files are ready. Login to your dashboard to access them.</p>
        <hr style="border-color:#4c1d95;"/>
        <p style="color:#94a3b8;font-size:12px;">HEKA ProjectHive</p>
      </div>
    `,
  });
}

async function sendContactAutoReply(email, name) {
  return sendEmail({
    to: email,
    subject: '📩 We received your message — HEKA ProjectHive',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:linear-gradient(135deg,#1a1a2e,#16213e);color:#fff;padding:40px;border-radius:16px;">
        <h1 style="color:#a78bfa;">Hi ${name}! 👋</h1>
        <p>Thank you for reaching out. We've received your message and will get back to you within 24 hours.</p>
        <hr style="border-color:#4c1d95;"/>
        <p style="color:#94a3b8;font-size:12px;">HEKA ProjectHive — Contact Team</p>
      </div>
    `,
  });
}

module.exports = { sendEmail, sendWelcomeEmail, sendOrderConfirmation, sendDeliveryNotification, sendContactAutoReply };
