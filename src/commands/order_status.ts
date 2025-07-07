import { extendedAPICommand } from "../utils/typings/types.js";
import { fetchOrderStatus } from "../utils/resellerAPI.js";
import { createOrderStatusEmbed } from "../utils/embeds.js";

export default {
  name: "order_status",
  description: "Check the status of an order by Order ID",

  options: [
    {
      name: "uniqid",
      description: "Order ID to check",
      type: 3,
      required: true,
    },
  ],

  execute: async (interaction) => {
    const uniqid = interaction.options.getString("uniqid", true);

    const status = await fetchOrderStatus(uniqid);

    const embed = createOrderStatusEmbed(interaction.guild, status);

    return embed;
  },
} satisfies extendedAPICommand;
