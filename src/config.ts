import dotenv from "dotenv";
import winston, { format } from "winston";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
export const FK_COOKIE = process.env.FK_COOKIE || "your_fkcookie";
export const PORT = process.env.PORT || 3000;
export const admin = {
  username: process.env.ADMIN_USERNAME || "admin_username",
  email: process.env.ADMIN_EMAIL || "admin_email",
  password: process.env.ADMIN_PASS || "admin_pass",
};

const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.simple(),
    format.printf(
      ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Create a stream object with a 'write' function that will be used by `morgan`
const loggerStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export { logger, loggerStream };
