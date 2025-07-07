import { extendedAPICommand, ServiceTypes } from "../utils/typings/types.js";
import { fetchAmountAvailability } from "../utils/resellerAPI.js";
import { createAmountEmbed } from "../utils/embeds.js";
import { SERVICE_TYPES } from "../utils/constants.js";

export default {
  name: "check_amount",
  description: "Check available amount for a REACT or BUTTON order",

  options: [
    {
      name: "service",
      description: "Choose service type",
      type: 3,
      required: true,
      choices: SERVICE_TYPES,
    },
    {
      name: "order_id",
      description: "Your MEMBERS_ORDER_ID",
      type: 3,
      required: true,
    },
  ],

  execute: async (interaction) => {
    const service = interaction.options.getString(
      "service",
      true
    ) as ServiceTypes;
    const uniqid = interaction.options.getString("order_id", true);

    const result = await fetchAmountAvailability(service, uniqid);

    const embed = createAmountEmbed(interaction.guild, result.available);

    return embed;
  },
} satisfies extendedAPICommand;
