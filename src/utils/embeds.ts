import { EmbedBuilder, Guild } from "discord.js";
import {
  BaseEmbedOptions,
  CreateEmojiButtonOrderResponse,
  GetBalanceResponse,
  GetMembersResponse,
  orderCreateResponse,
  OrderStatus,
} from "./typings/types.js";

export function buildBaseEmbed({
  guild,
  title,
  description,
  color = 9590489,
  fields = [],
}: BaseEmbedOptions) {
  return (
    new EmbedBuilder()
      .setTitle(title ?? null)
      .setColor(color)
      .setDescription(description ?? null)
      .addFields(fields)
      .setFooter({
        text: guild.name,
        iconURL: guild.iconURL({ size: 128 }) || undefined,
      })
      // .setThumbnail(
      //   "https://media.discordapp.net/attachments/1387420725069090948/1388080189489021171/avatar.gif?ex=6868e86a&is=686796ea&hm=d036c62e675a21637bf6229f568fbf7c8f5c1f83cdd6d0323a2d61351652621c&=&width=250&height=250"
      // )
      .setImage(
        "https://media.discordapp.net/attachments/1387812517375639592/1387899554392707133/sythe_banner.gif?ex=686a3a6f&is=6868e8ef&hm=ce12ee55387c4a161e758d5d916c36929b2c1201550b1abffd5ad5d26cf0c283&=&width=500&height=75"
      )
  );
}

export function createBalanceEmbed(guild: Guild, data: GetBalanceResponse) {
  return buildBaseEmbed({
    guild,
    title: "💳 Check your balance",

    fields: [
      {
        name: "Available Balance",
        value: `\`\`\`${data.balance} USD\`\`\``,
      },
    ],
  });
}

export function createMembersEmbed(
  guild: Guild,
  service: string,
  serverId: string,
  data: GetMembersResponse
) {
  return buildBaseEmbed({
    guild,
    title: "🧾 Member Availability",
    fields: [
      //   {
      //     name: "Service Type",
      //     value: service.replace("OAUTH-", ""),
      //     inline: true,
      //   },
      //   { name: "Server ID", value: serverId, inline: true },
      {
        name: "Available Members",
        value: `\`\`\`${data.available}\`\`\``,
        inline: false,
      },
      {
        name: "Maximum Limit",
        value: `\`\`\`${data.maximum}\`\`\``,
        inline: false,
      },
    ],
  });
}

export function createAmountEmbed(
  guild: Guild,

  available: number
) {
  return buildBaseEmbed({
    guild,
    title: "📦 Order Availability",
    fields: [
      {
        name: "Available Amount",
        value: `\`\`\`${available}\`\`\``,
        inline: true,
      },
    ],
  });
}

export function createOrderEmbed(guild: Guild, data: orderCreateResponse) {
  return buildBaseEmbed({
    guild,
    title: "🚀 Order Created",
    fields: [
      { name: "Order ID", value: `\`\`\`${data.uniqid}\`\`\``, inline: false },
      {
        name: "Bot Invite Link",
        value: `[Click Here](${data.bot_invite})`,
        inline: false,
      },
      // {
      //   name: "Cost",
      //   value: `\`\`\`${data.cost} USD\`\`\``,
      //   inline: false,
      // },
    ],
  });
}

export const createEmojiButtonEmbed = (
  guild: Guild,
  data: CreateEmojiButtonOrderResponse
) => {
  return buildBaseEmbed({
    guild,
    title: "🚀 Order Created",
    fields: [
      { name: "Order ID", value: `\`\`\`${data.uniqid}\`\`\``, inline: false },

      // {
      //   name: "Cost",
      //   value: `\`\`\`${data.cost} USD\`\`\``,
      //   inline: false,
      // },
    ],
  });
};

export const createOrderStatusEmbed = (guild: Guild, status: OrderStatus) => {
  const embed = buildBaseEmbed({
    guild,
  });

  let title = ``;

  embed.addFields({ name: "Status", value: `\`\`\`${status.status}\`\`\`` });

  // Members
  if ("type" in status && status.type !== "REACT") {
    title = `👥 Members`;

    embed.addFields(
      { name: "Type", value: `\`\`\`${status.type}\`\`\``, inline: false },
      {
        name: "Server",
        value: status.serverName || status.serverId,
        inline: false,
      },
      { name: "Added", value: `${status.added}/${status.amount}`, inline: true }
    );

    if (status.expiredAt)
      embed.addFields({
        name: "Expires",
        value: `<t:${Math.floor(status.expiredAt / 1000)}:R>`,
        inline: true,
      });

    embed.addFields({
      name: "Delay",
      value: `${status.delay}s`,
      inline: true,
    });

    embed.addFields({
      name: "Details",
      value: status.details,
      inline: false,
    });
  }

  // Emoji
  if ("value" in status && "quantity" in status) {
    title = `🔁 Emoji`;
    embed.addFields(
      {
        name: "React URL",
        value: `https://discord.com/channels/${status.messageId ?? "NONE"}/${
          status.channelId ?? "NONE"
        }/${status.messageId ?? "NONE"}`,
      },
      {
        name: "Added",
        value: `${status.added}/${status.quantity}`,
        inline: true,
      }
    );
    embed.addFields({
      name: "Emoji",
      value: `<${status.emoji}>`,
      inline: true,
    });
    embed.addFields({
      name: "Delay",
      value: `${status.delay}s`,
      inline: true,
    });

    if (status.error)
      embed.addFields({ name: "Error", value: status.error, inline: false });
  }

  // Button
  if ("payload" in status) {
    title = `🔘 Button`;
    embed.addFields(
      {
        name: "Server",
        value: status.serverName || status.serverId,
        inline: true,
      },
      {
        name: "Added",
        value: `${status.added}/${status.amount}`,
        inline: true,
      },
      {
        name: "Payload",
        value: `\`\`\`yaml\n${status.payload}\`\`\``,
        inline: false,
      }
    );

    embed.addFields({
      name: "Delay",
      value: `${status.delay}s`,
      inline: true,
    });

    embed.addFields({ name: "Details", value: status.details });
  }

  // Boost
  if ("duration" in status) {
    title = `🚀 Boost`;
    embed.addFields(
      {
        name: "Server",
        value: `\`\`\`${status.serverName}\`\`\``,
        inline: false,
      },
      { name: "Duration", value: status.duration, inline: false },
      {
        name: "Amount of boosts",
        value: status.boosts.toString(),
        inline: false,
      },
      {
        name: "Created",
        value: `<t:${Math.floor(status.created_at / 1000)}:R>`,
        inline: false,
      }
    );
    embed.addFields({ name: "Details", value: status.details });
  }

  embed.setTitle(`${title} Order: ${status.uniqid}`);

  return embed;
};
