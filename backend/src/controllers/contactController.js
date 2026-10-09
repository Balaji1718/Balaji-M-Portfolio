import { config } from "../config/index.js";

function generateSubject(name, message) {
  const cleanMsg = (message || "").trim().replace(/\s+/g, " ");
  const lower = cleanMsg.toLowerCase();
  let topic = "General Inquiry";

  if (
    lower.includes("internship") ||
    lower.includes("hire") ||
    lower.includes("job") ||
    lower.includes("opportunity") ||
    lower.includes("role")
  ) {
    topic = "Opportunity / Recruitment";
  } else if (
    lower.includes("project") ||
    lower.includes("collaborat") ||
    lower.includes("build") ||
    lower.includes("freelance")
  ) {
    topic = "Project Collaboration";
  } else if (
    lower.includes("findback") ||
    lower.includes("breathesmart") ||
    lower.includes("spendpilot") ||
    lower.includes("skillbridge") ||
    lower.includes("healthguardian")
  ) {
    topic = "Project Feedback / Query";
  } else if (cleanMsg.length > 0) {
    const preview = cleanMsg.slice(0, 40);
    topic = preview.length === 40 ? `${preview}...` : preview;
  }

  return `Portfolio Contact from ${name || "Visitor"} — ${topic}`;
}

export async function sendContactEmail(req, res) {
  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    const subject = generateSubject(name, message);

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e5; border-radius: 8px;">
        <h2 style="color: #171717; margin-top: 0; font-size: 20px;">New Message from Portfolio Website</h2>
        <div style="background-color: #f9f9f9; padding: 16px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Sender Name:</strong> ${name}</p>
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #c25e3e;">${email}</a></p>
          <p style="margin: 0; font-size: 14px;"><strong>Auto-Generated Subject:</strong> ${subject}</p>
        </div>
        <h3 style="color: #171717; margin-bottom: 8px; font-size: 16px;">Message:</h3>
        <div style="white-space: pre-wrap; line-height: 1.6; color: #262626; background: #ffffff; padding: 16px; border-left: 3px solid #c25e3e; border-radius: 4px; border: 1px solid #eee;">
${message}
        </div>
        <p style="font-size: 12px; color: #737373; margin-top: 24px; border-top: 1px solid #eee; padding-top: 12px;">
          Sent from Balaji M's Portfolio contact form. You can reply directly to this email to respond to ${name}.
        </p>
      </div>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [config.recipientEmail],
        reply_to: email,
        subject,
        html: emailHtml,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", data);
      return res.status(response.status).json({
        error: data.message || "Failed to send email via Resend.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
      id: data.id,
    });
  } catch (error) {
    console.error("Contact controller error:", error);
    return res.status(500).json({
      error: "Internal server error while processing your request.",
    });
  }
}
