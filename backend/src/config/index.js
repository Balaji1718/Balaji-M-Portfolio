export const config = {
  port: parseInt(process.env.PORT || "5002", 10),
  isProduction: process.env.NODE_ENV === "production" || process.argv.includes("--production"),
  resendApiKey: process.env.RESEND_API_KEY,
  recipientEmail: process.env.RECIPIENT_EMAIL || "balajimurugan1708@gmail.com",
};
