import crypto from "node:crypto";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { OxaInvoiceStatusResponseData } from "../utils/typings/OxapayTypes.js";
import { generateOxaInvoiceStatusEmbed } from "../utils/oxaEmbed.js";
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
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestHMAC = req.headers["hmac"];
  const ourHMAC = crypto.createHmac(
    "sha512",
    process.env.OXAPAY_MERCHANT_API_KEY
  );

  ourHMAC.update((req as customRequest).rawBody);

  const digest = ourHMAC.digest("hex");

  if (digest !== requestHMAC)
    return res.status(403).json({ status: "Unauthorized" });

  next();
}

async function handleWebhookEvent(
  req: Request<{}, {}, OxaInvoiceStatusResponseData>,
  res: Response
) {
  if (req.body.type === "invoice" && req.body.status === "PAID") {
    console.log(req.body);

    const guild = client.guilds.cache.get(process.env.GUILD_ID)!;

    const embed = generateOxaInvoiceStatusEmbed(guild, req.body, true);

    await sendLogInChannel({ embeds: [embed] }, process.env.LOGS_CHANNEL_ID);
    await sendLogInChannel(
      { embeds: [embed] },
      req.body.order_id.split("-")[0]
    );
  }

  res.send("Success");
}

export default app;
