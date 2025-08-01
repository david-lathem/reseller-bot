import { extendedAPICommand } from "../utils/typings/types.js";
import { generateOxaInvoice } from "../utils/oxaAPI.js";
import {
  generateInvoiceGenNotifierEmbed,
  generateOxaInvoiceEmbed,
} from "../utils/oxaEmbed.js";
import { sendLogInChannel } from "../utils/logs.js";

export default {
  name: "gen_oxa_invoice",
  description: "Generate a payment invoice via OxaPay",
  authorizedRoleOnly: true,

  options: [
    {
      name: "amount",
      description: "Amount in USD or crypto",
      type: 10, // number,
      min_value: 1,
      required: true,
    },
    {
      name: "currency",
      description: "Currency symbol (e.g. USDT, BTC)",
      type: 3,
    },
    {
      name: "lifetime",
      description: "Expiration in minutes (15–2880), default 60",
      min_value: 15,
      max_value: 2880,
      type: 4,
    },
    {
      name: "fee_paid_by_payer",
      description: "1 = payer pays fee, 0 = you pay fee",
      min_value: 0,
      max_value: 1,
      type: 4,
    },
    {
      name: "under_paid_coverage",
      description: "Acceptable underpayment margin (0–60)",
      min_value: 0,
      max_value: 60,
      type: 10,
    },
    {
      name: "to_currency",
      description: "Convert paid currency to (e.g. USDT)",
      type: 3,
    },
    {
      name: "auto_withdrawal",
      description: "Withdraw to linked address? true/false",
      type: 5,
    },
    {
      name: "mixed_payment",
      description: "Allow mixed payments from different coins",
      type: 5,
    },
    {
      name: "email",
      description: "Payer’s email (optional)",
      type: 3,
    },

    {
      name: "thanks_message",
      description: "Custom thank you message (optional)",
      type: 3,
    },
    {
      name: "description",
      description: "Invoice description / order details",
      type: 3,
    },
  ],
  execute: async (interaction) => {
    const amount = interaction.options.getNumber("amount", true);
    const currency = interaction.options.getString("currency");
    const lifetime = interaction.options.getInteger("lifetime");
    const fee_paid_by_payer =
      interaction.options.getInteger("fee_paid_by_payer");
    const under_paid_coverage = interaction.options.getNumber(
      "under_paid_coverage"
    );
    const to_currency = interaction.options.getString("to_currency");
    const auto_withdrawal = interaction.options.getBoolean("auto_withdrawal");
    const mixed_payment = interaction.options.getBoolean("mixed_payment");
    const email = interaction.options.getString("email");
    const thanks_message = interaction.options.getString("thanks_message");
    const description = interaction.options.getString("description");

    const payload = {
      amount,
      currency,
      lifetime,
      fee_paid_by_payer,
      under_paid_coverage,
      to_currency,
      auto_withdrawal,
      mixed_payment,
      email,
      order_id: `${interaction.channel?.id}-${interaction.user.id}`,
      thanks_message,
      description,
      sandbox: process.env.NODE_ENV === "development",
    };

    const res = await generateOxaInvoice(payload);

    const embed = generateOxaInvoiceEmbed(interaction.guild, res);

    const invoiceNotifierEmbed = generateInvoiceGenNotifierEmbed(
      interaction.guild,
      res,
      interaction.user
    );

    await sendLogInChannel(
      { embeds: [invoiceNotifierEmbed] },
      process.env.LOGS_CHANNEL_ID
    );

    return embed;
  },
} satisfies extendedAPICommand;
