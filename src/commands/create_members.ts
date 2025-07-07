import { extendedAPICommand, OAUTHMemberType } from "../utils/typings/types.js";
import { createOAuthOrder } from "../utils/resellerAPI.js";
import { createOrderEmbed } from "../utils/embeds.js";
import { OAUTH_MEMBERS_TYPES } from "../utils/constants.js";
import { createOrderInDb } from "../database/queries.js";

export default {
  name: "create_members",
  description: "Create a new member order for a Discord server",

  options: [
    {
      name: "service",
      description: "Service type",
      type: 3,
      required: true,
      choices: OAUTH_MEMBERS_TYPES,
    },
    {
      name: "server_id",
      description: "Discord Server ID",
      type: 3,
      required: true,
    },
    {
      name: "amount",
      description: "Amount of members",
      type: 4,
      required: true,
      min_value: 1,
    },
    {
      name: "delay",
      description: "Delay in seconds (1-1200)",
      type: 4,
      required: false,
      min_value: 1,
      max_value: 1200,
    },
    {
      name: "billing_cycle",
      description: "Billing cycle in months (1-12) — only for online members",
      type: 4,
      required: false,
      min_value: 1,
      max_value: 12,
    },
  ],

  execute: async (interaction) => {
    const service = interaction.options.getString(
      "service",
      true
    ) as OAUTHMemberType;
    const guildId = interaction.options.getString("server_id", true);
    const amount = interaction.options.getInteger("amount", true);
    const delay = interaction.options.getInteger("delay") ?? undefined;
    const billingCycle =
      interaction.options.getInteger("billing_cycle") ?? undefined;

    const order = await createOAuthOrder({
      service,
      id: guildId,
      amount,
      delay,
      billingCycle,
    });

    createOrderInDb.run({
      guildId,
      service,
      uniqid: order.uniqid,
      createdAt: Date.now(),
    });

    const embed = createOrderEmbed(interaction.guild, order);

    return embed;
  },
} satisfies extendedAPICommand;
