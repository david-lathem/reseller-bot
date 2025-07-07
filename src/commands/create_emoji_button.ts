import { extendedAPICommand, ServiceTypes } from "../utils/typings/types.js";
import { createEmojiButtonOrder } from "../utils/resellerAPI.js";
import { getLatestOrderByGuilId } from "../database/queries.js";
import { createEmojiButtonEmbed } from "../utils/embeds.js";
import { SERVICE_TYPES } from "../utils/constants.js";

export default {
  name: "create_emoji_button",
  description: "Create an order for React or Button service",

  options: [
    {
      name: "service",
      description: "Choose service type",
      type: 3,
      required: true,
      choices: SERVICE_TYPES,
    },
    {
      name: "server_id",
      description: "Discord Server ID (will find latest order from this)",
      type: 3,
      required: true,
    },
    {
      name: "link",
      description: "Discord React or Button URL",
      type: 3,
      required: true,
    },
    {
      name: "amount",
      description: "Amount of interactions",
      type: 4,
      required: true,
      min_value: 1,
    },
    {
      name: "delay",
      description: "Delay in seconds (optional)",
      type: 4,
      required: false,
      min_value: 1,
      max_value: 1200,
    },
  ],

  execute: async (interaction) => {
    const service = interaction.options.getString(
      "service",
      true
    ) as ServiceTypes;
    const guildId = interaction.options.getString("server_id", true);
    const link = interaction.options.getString("link", true);
    const amount = interaction.options.getInteger("amount", true);
    const delay = interaction.options.getInteger("delay") ?? undefined;

    console.log(link);

    const latestOrder = getLatestOrderByGuilId.get({ guildId });

    if (!latestOrder) {
      throw new Error("No previous member order found for this server.");
    }

    const order = await createEmojiButtonOrder({
      service,
      uniqid: latestOrder.uniqid,
      link,
      amount,
      delay,
    });
    // const order = {
    //   uniqid: "1222",
    //   cost: 23,
    // };
    const embed = createEmojiButtonEmbed(interaction.guild, order);
    return embed;
  },
} satisfies extendedAPICommand;
