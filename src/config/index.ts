const appConfig = require('dotenv').config({ path: `.env.local` });

// CORE APP
export const NODE_ENV = process.env.NODE_ENV ?? appConfig.parsed.NODE_ENV;
export const PORT = parseInt(process.env.PORT ?? appConfig.parsed.PORT);
export const CREDENTIALS = process.env.CREDENTIALS ?? appConfig.parsed.CREDENTIALS === 'true';
export const LOG_FORMAT = process.env.LOG_FORMAT ?? appConfig.parsed.LOG_FORMAT;
export const LOG_DIR = process.env.LOG_DIR ?? appConfig.parsed.LOG_DIR;
export const DEBUG = process.env.DEBUG ?? appConfig.parsed.DEBUG === 'true';
export const ORIGIN = process.env.ORIGIN ?? appConfig.parsed.ORIGIN;
export const APP_URL = 'http://localhost:3000';

// DB
export const DB_HOST = process.env.DB_HOST ?? appConfig.parsed.DB_HOST;
export const DB_PORT = parseInt(process.env.DB_PORT ?? appConfig.parsed.DB_PORT);
export const DB_USER = process.env.DB_USER ?? appConfig.parsed.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD ?? appConfig.parsed.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE ?? appConfig.parsed.DB_DATABASE;

// APP KEY
export const SECRET_KEY = process.env.SECRET_KEY ?? appConfig.parsed.SECRET_KEY;
export const OMS_APP_KEY = process.env.OMS_APP_KEY ?? appConfig.parsed.OMS_APP_KEY;
export const TMS_APP_KEY = process.env.TMS_APP_KEY ?? appConfig.parsed.TMS_APP_KEY;
export const CARRIER_APP_KEY = process.env.CARRIER_APP_KEY ?? appConfig.parsed.CARRIER_APP_KEY;
export const AUTO_REPORT_APP_KEY = process.env.AUTO_REPORT_APP_KEY ?? appConfig.parsed.AUTO_REPORT_APP_KEY;

// User Portal
export const USER_PORTAL_URL = process.env.USER_PORTAL_URL ?? appConfig.parsed.USER_PORTAL_URL;
export const USER_PORTAL_APPID = 'pivotwebapp';
export const USER_PORTAL_PUBLIC_KEY = process.env.USER_PORTAL_PUBLIC_KEY ?? appConfig.parsed.USER_PORTAL_PUBLIC_KEY;
// Allow APP
export const ALLOWAPP = {
  oms: { key: OMS_APP_KEY, app_name: 'oms' },
  tms: { key: TMS_APP_KEY, app_name: 'tms' },
  'carrier-web': { key: CARRIER_APP_KEY, app_name: 'carrier-web' },
  'auto-report': { key: AUTO_REPORT_APP_KEY, app_name: 'auto-report' },
};
