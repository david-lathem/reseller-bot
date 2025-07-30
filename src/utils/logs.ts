import { MessageCreateOptions, TextChannel } from "discord.js";
import client from "../client.js";

export const sendLogInChannel = async (
  data: MessageCreateOptions,
  channelId: string
) => {
  const logChannel = client.channels.cache.get(channelId) as TextChannel;

  if (!logChannel) return;

  await logChannel.send(data);
};
