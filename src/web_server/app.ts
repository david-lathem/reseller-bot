import crypto from "node:crypto";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import {
  OxaInvoiceStatusResponseData,
  OxaPayoutStatsData,
} from "../utils/typings/OxapayTypes.js";
import {
  generateOxaInvoiceStatusEmbed,
  generateOxaPayoutStatsEmbed,
} from "../utils/oxaEmbed.js";
import client from "../client.js";
import { sendLogInChannel } from "../utils/logs.js";
import { customRequest } from "../utils/typings/types.js";

const app = express();

const { NODE_ENV } = process.env;

if (NODE_ENV === "development") app.use(morgan("dev"));

app.use(
  express.json({
    verify: (req: customRequest, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.post("/oxapay/callback", handleOxaPaySigning, handleWebhookEvent);

// Handle undefined routes
app.use((req: Request, res: Response) => {
  res.json({ status: "Working :p" });
});

async function handleOxaPaySigning(
  req: Request<{}, {}, OxaInvoiceStatusResponseData | OxaPayoutStatsData>,
  res: Response,
  next: NextFunction
) {
  console.log(req.body);

  let apiKey: string = process.env.OXAPAY_MERCHANT_API_KEY;

  if (req.body.type === "payout") apiKey = process.env.OXAPAY_PAYOUT_API_KEY;

  const requestHMAC = req.headers["hmac"];
  const ourHMAC = crypto.createHmac("sha512", apiKey);

  ourHMAC.update((req as customRequest).rawBody);

  const digest = ourHMAC.digest("hex");

  if (digest !== requestHMAC)
    return res.status(403).json({ status: "Unauthorized" });

  next();
}

async function handleWebhookEvent(
  req: Request<{}, {}, OxaInvoiceStatusResponseData | OxaPayoutStatsData>,
  res: Response
) {
  console.log(req.body);
  if (req.body.type === "invoice" && req.body.status === "Paid") {
    const guild = client.guilds.cache.get(process.env.GUILD_ID)!;

    const embed = generateOxaInvoiceStatusEmbed(guild, req.body, true);

    await sendLogInChannel({ embeds: [embed] }, process.env.LOGS_CHANNEL_ID);
    await sendLogInChannel(
      { embeds: [embed] },
      req.body.order_id.split("-")[0]
    );
  }

  if (req.body.type === "payout" && req.body.status === "Confirmed") {
    const guild = client.guilds.cache.get(process.env.GUILD_ID)!;

    const embed = generateOxaPayoutStatsEmbed(guild, req.body, true);

    await sendLogInChannel(
      { embeds: [embed] },
      process.env.PAYOUT_LOGS_CHANNEL_ID
    );
  }

  res.send("Success");
}

export default app;
