import { extendedAPICommand } from "../utils/typings/types.js";
import { fetchBalance } from "../utils/resellerAPI.js";
import { createBalanceEmbed } from "../utils/embeds.js";

export default {
  name: "balance",
  description: "Check balance",
  execute: async (interaction) => {
    const res = await fetchBalance();

    const embed = createBalanceEmbed(interaction.guild, res);

    return embed;
  },
} satisfies extendedAPICommand;
