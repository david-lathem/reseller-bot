declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      BOT_OWNER_IDS: string;
      GUILD_ID: string;
      LOGS_CHANNEL_ID: string;
      PAYOUT_LOGS_CHANNEL_ID: string;

      // HTTP SERVER
      PORT: string;
      NODE_ENV: "production" | "development";

      RESELLER_API_BASE_URL: string;
      RESELLER_API_KEY: string;

      // OXA_PAY
      OXAPAY_API_BASE_URL: string;
      OXAPAY_GENERAL_API_KEY: string;
      OXAPAY_PAYOUT_API_KEY: string;
      OXAPAY_MERCHANT_API_KEY: string;
    }
  }
}

// // If this file has no import/export statements (i.e. is a script)
// // convert it into a module by adding an empty export statement.
export {};
