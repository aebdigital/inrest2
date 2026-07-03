export const runtime = "nodejs";

const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers });
}

function clean(value, limit = 5000) {
  return String(value ?? "")
    .trim()
    .replace(/\r\n/g, "\n")
    .slice(0, limit);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validatePayload(payload) {
  const errors = {};
  if (payload.name.length < 2) errors.name = "Zadajte meno.";
  if (!EMAIL_PATTERN.test(payload.email)) errors.email = "Zadajte platný e-mail.";
  if (payload.message.length < 12) errors.message = "Správa musí mať aspoň 12 znakov.";
  return errors;
}

function buildTextBody(payload) {
  return [
    "Novy dopyt z webu INREST",
    "",
    `Meno: ${payload.name}`,
    `E-mail: ${payload.email}`,
    `Firma: ${payload.company || "-"}`,
    `Telefon: ${payload.phone || "-"}`,
    "",
    "Sprava:",
    payload.message,
  ].join("\n");
}

function buildHtmlBody(payload) {
  return `
    <h1>Novy dopyt z webu INREST</h1>
    <p><strong>Meno:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Firma:</strong> ${escapeHtml(payload.company || "-")}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(payload.phone || "-")}</p>
    <p><strong>Sprava:</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
  `;
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers });
}

export async function POST(req) {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const recipient = process.env.CONTACT_FORM_RECIPIENT;
  const sender = process.env.SMTP2GO_SENDER;

  if (!apiKey || !recipient || !sender) {
    return json(
      {
        ok: false,
        message:
          "Kontaktny formular nie je nakonfigurovany. Doplňte SMTP2GO_API_KEY, SMTP2GO_SENDER a CONTACT_FORM_RECIPIENT.",
      },
      500
    );
  }

  let requestData;
  try {
    requestData = await req.json();
  } catch {
    return json({ ok: false, message: "Neplatne data formulara." }, 400);
  }

  const payload = {
    name: clean(requestData.name, 120),
    email: clean(requestData.email, 180),
    company: clean(requestData.company, 160),
    phone: clean(requestData.phone, 80),
    message: clean(requestData.message, 4000),
    website: clean(requestData.website, 160),
  };

  if (payload.website) {
    return json({ ok: true, message: "Dakujeme, sprava bola prijata." });
  }

  const errors = validatePayload(payload);
  if (Object.keys(errors).length > 0) {
    return json(
      { ok: false, message: "Skontrolujte prosim formular.", errors },
      400
    );
  }

  const smtpResponse = await fetch("https://api.smtp2go.com/v3/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Smtp2go-Api-Key": apiKey,
    },
    body: JSON.stringify({
      sender,
      to: [recipient],
      subject: `INREST web - novy dopyt od ${payload.name}`,
      text_body: buildTextBody(payload),
      html_body: buildHtmlBody(payload),
      custom_headers: [
        { header: "Reply-To", value: payload.email },
        { header: "X-INREST-Source", value: "website-contact-form" },
      ],
    }),
  });

  const smtpData = await smtpResponse.json().catch(() => ({}));
  const failedCount = smtpData?.data?.failed ?? 0;

  if (!smtpResponse.ok || failedCount > 0) {
    return json(
      {
        ok: false,
        message: "Spravu sa nepodarilo odoslat. Skuste to prosim znova.",
        details: smtpData?.data?.failures || null,
      },
      502
    );
  }

  return json({
    ok: true,
    message: "Dakujeme, sprava bola odoslana. Ozveme sa vam co najskor.",
  });
}
