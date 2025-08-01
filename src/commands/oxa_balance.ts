import { extendedAPICommand } from "../utils/typings/types.js";
import { fetchOxaBalance } from "../utils/oxaAPI.js";
import { generateOxaBalanceEmbed } from "../utils/oxaEmbed.js";

export default {
  name: "oxa_balance",
  description: "Check OxaPay balance",
  authorizedRoleOnly: true,

  execute: async (interaction) => {
    const res = await fetchOxaBalance();

    const embed = generateOxaBalanceEmbed(interaction.guild, res);
    return embed;
  },
} satisfies extendedAPICommand;
