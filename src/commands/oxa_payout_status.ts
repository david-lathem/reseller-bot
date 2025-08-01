import { extendedAPICommand } from "../utils/typings/types.js";
import { fetchOxaPayoutStats } from "../utils/oxaAPI.js";
import { generateOxaPayoutStatsEmbed } from "../utils/oxaEmbed.js";

export default {
  name: "oxa_payout_status",
  description: "Check payout status via track ID",
  authorizedRoleOnly: true,
  options: [
    {
      name: "track_id",
      description: "Track ID of the payout",
      type: 10, // string
      required: true,
    },
  ],
  execute: async (interaction) => {
    const trackId = interaction.options.getNumber("track_id", true);
    const res = await fetchOxaPayoutStats(trackId);

    // const res = {
    //   data: {
    //     track_id: "258298351",
    //     address: "1AmH3Qz2LooYa1YSyLhySuatwoRMsfznPJ",
    //     currency: "BTC",
    //     network: "Bitcoin Network",
    //     amount: 0.02,
    //     fee: 0.00001,
    //     status: "processing",
    //     tx_hash: "",
    //     description: "test",
    //     internal: false,
    //     memo: "test",
    //     date: 1736501470,
    //   },
    //   message: "Operation completed successfully!",
    //   error: {},
    //   status: 200,
    //   version: "1.0.0",
    // };

    const embed = generateOxaPayoutStatsEmbed(interaction.guild, res.data);
    return embed;
  },
} satisfies extendedAPICommand;
