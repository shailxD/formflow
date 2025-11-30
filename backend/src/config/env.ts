import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  dbFileName: process.env.DB_FILE_NAME,
  jwtSecret: process.env.JWT_SECRET || "default_secret",
};
