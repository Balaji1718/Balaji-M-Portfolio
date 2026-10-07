export const config = {
  port: parseInt(process.env.PORT || "5002", 10),
  isProduction: process.env.NODE_ENV === "production" || process.argv.includes("--production"),
};
