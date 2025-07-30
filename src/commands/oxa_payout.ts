import { extendedAPICommand } from "../utils/typings/types.js";
import { sendOxaPayout } from "../utils/oxaAPI.js";
import { generateOxaPayoutEmbed } from "../utils/oxaEmbed.js";

export default {
  name: "oxa_payout",
  description: "Send a payout via OxaPay",
  options: [
    {
      name: "address",
      description: "Recipient's crypto address",
      type: 3, // string
      required: true,
    },
    {
      name: "currency",
      description: "Currency symbol (e.g. BTC, ETH)",
      type: 3, // string
      required: true,
    },
    {
      name: "amount",
      description: "Amount to send",
      type: 10, // number
      required: true,
    },
    {
      name: "network",
      description: "Blockchain network (optional)",
      type: 3,
    },
    {
      name: "memo",
      description: "Memo/Tag (optional)",
      type: 3,
    },
    {
      name: "description",
      description: "Additional payout description (optional)",
      type: 3,
    },
  ],
  execute: async (interaction) => {
    const address = interaction.options.getString("address", true);
    const currency = interaction.options.getString("currency", true);
    const amount = interaction.options.getNumber("amount", true);
    const network = interaction.options.getString("network");
    const memo = interaction.options.getString("memo");
    const description = interaction.options.getString("description");

    const payload = {
      address,
      currency,
      amount,
      network,
      memo,
      description,
    };

    const res = await sendOxaPayout(payload);
    // const res = {
    //   data: {
    //     track_id: "258298451",
    //     status: "processing",
    //   },
    //   message: "Operation completed successfully!",
    //   error: {},
    //   status: 200,
    //   version: "1.0.0",
    // };
    const embed = generateOxaPayoutEmbed(interaction.guild, res);

    return embed;
  },
} satisfies extendedAPICommand;
