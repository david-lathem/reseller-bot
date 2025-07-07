import { extendedAPICommand, OAUTHMemberType } from "../utils/typings/types.js";
import { fetchMembers } from "../utils/resellerAPI.js";
import { createMembersEmbed } from "../utils/embeds.js";
import { OAUTH_MEMBERS_TYPES } from "../utils/constants.js";

export default {
  name: "members_get",
  description:
    "Check available/maximum members for a given service and server ID",

  options: [
    {
      name: "service",
      description: "Service Type",
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
  ],

  execute: async (interaction) => {
    const service = interaction.options.getString(
      "service",
      true
    ) as OAUTHMemberType;
    const guildId = interaction.options.getString("server_id", true);

    const data = await fetchMembers(service, guildId);

    const embed = createMembersEmbed(interaction.guild, service, guildId, data);

    return embed;
  },
} satisfies extendedAPICommand;
