import nodemailer from "nodemailer";

const CONTACT_TO = "riosemarestour@gmail.com";

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function validatePayload(payload) {
  const name = String(payload?.name ?? "").trim();
  const email = String(payload?.email ?? "").trim();
  const message = String(payload?.message ?? "").trim();

  if (!name) return { ok: false, error: "Informe seu nome." };
  if (!email || !email.includes("@")) return { ok: false, error: "Informe um e-mail válido." };
  if (!message) return { ok: false, error: "Escreva uma mensagem." };

  return { ok: true, data: { name, email, message } };
}

function buildTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const validation = validatePayload(payload);

    if (!validation.ok) {
      return Response.json({ ok: false, error: validation.error }, { status: 400 });
    }

    const transporter = buildTransporter();

    if (!transporter) {
      return Response.json(
        {
          ok: false,
          error: "Serviço de e-mail não configurado no servidor.",
        },
        { status: 500 }
      );
    }

    const { name, email, message } = validation.data;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Site Rios&Mares Tour" <${process.env.SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Novo contato do site - ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a; line-height: 1.6;">
          <h2 style="margin: 0 0 12px;">Novo contato do site</h2>
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>E-mail:</strong> ${safeEmail}</p>
          <p><strong>Mensagem:</strong></p>
          <p style="white-space: pre-line;">${safeMessage}</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "Erro interno ao enviar mensagem." },
      { status: 500 }
    );
  }
}
