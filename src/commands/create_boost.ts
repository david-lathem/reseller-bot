import {
  CreateBoostDuration,
  extendedAPICommand,
} from "../utils/typings/types.js";
import { createBoostOrder } from "../utils/resellerAPI.js";
import { createOrderEmbed } from "../utils/embeds.js";

export default {
  name: "create_boost",
  description: "Create a Nitro boost order for a Discord server",

  options: [
    {
      name: "duration",
      description: "Duration of the boosts",
      type: 3,
      required: true,
      choices: [
        { name: "1 Month", value: "ONE_MONTH" },
        { name: "3 Months", value: "THREE_MONTH" },
      ],
    },
    {
      name: "amount",
      description: "Amount of boosts",
      type: 4,
      required: true,
      min_value: 1,
    },
    {
      name: "link",
      description: "Discord invite link or code",
      type: 3,
      required: true,
    },
  ],

  execute: async (interaction) => {
    const duration = interaction.options.getString(
      "duration",
      true
    ) as CreateBoostDuration;
    const amount = interaction.options.getInteger("amount", true);
    const link = interaction.options.getString("link", true);

    const result = await createBoostOrder(duration, amount, link);

    const embed = createOrderEmbed(interaction.guild, result);

    return embed;
  },
} satisfies extendedAPICommand;
