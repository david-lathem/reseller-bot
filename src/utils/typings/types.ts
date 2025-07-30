import {
  APIEmbedField,
  ApplicationCommandOptionChoiceData,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  ColorResolvable,
  EmbedBuilder,
  Guild,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";
import { Request } from "express";

export interface extendedAPICommand
  extends RESTPostAPIChatInputApplicationCommandsJSONBody {
  permissionRequired?: bigint | Array<bigint>;
  guildOnly?: Boolean;
  autocomplete?(
    interaction: AutocompleteInteraction
  ): Promise<Array<ApplicationCommandOptionChoiceData | string>>;
  execute(
    interaction: ChatInputCommandInteraction<"cached">
  ): Promise<EmbedBuilder>;
}

export interface customRequest extends Request {
  rawBody: string;
}

export interface BaseCustomFetchOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any[] | Record<any, any>;
  additionalHeaders?: Record<any, any>;
}

export interface ResellerAPIOptions extends BaseCustomFetchOptions {
  oxapay?: undefined;
}

export interface OxaPayFetchOptions extends BaseCustomFetchOptions {
  oxapay: true;
  apiKeyType: "General" | "Merchant" | "Payout";
}

export interface GetBalanceResponse {
  balance: number;
}

export interface BaseEmbedOptions {
  guild: Guild;
  title?: string;
  description?: string;
  color?: ColorResolvable;
  fields?: APIEmbedField[];
}

export interface AvailableAmountResponse {
  available: number;
}

export interface GetMembersResponse extends AvailableAmountResponse {
  maximum: number;
}

// MEMBERS
export type OAUTHMemberType =
  | "OAUTH-OFFLINE"
  | "OAUTH-ONLINE"
  | "OAUTH-PREMIUM"
  | "OAUTH-NFT";

export interface CreateMemberOrderRequest {
  service: OAUTHMemberType;
  id: string;
  amount: number;
  delay?: number;
  billingCycle?: number;
}

// REACT/Button

export interface CreateEmojiButtonOrderPayload {
  service: ServiceTypes;
  uniqid: string;
  link: string;
  amount: number;
  delay?: number;
}

// API response
export interface CreateEmojiButtonOrderResponse {
  uniqid: string;
  cost: number;
}

export type ServiceTypes = "REACT" | "BUTTON";

export interface orderCreateResponse {
  uniqid: string;
  bot_invite: string;
  cost: number;
}

// BOOST
export type CreateBoostDuration = "ONE_MONTH" | "THREE_MONTH";

export interface CreateBoostRequest {
  service: "NITRO";
  duration: CreateBoostDuration;
  amount: number;
  link: string;
}

// Database
export interface DBOrder {
  uniqid: string;
  service: OAUTHMemberType;
  guildId: string;
  createdAt: number;
}

// Order Status
export type BaseOrderStatus = {
  uniqid: string;
  status: string;
};

export type MembersOrderStatus = BaseOrderStatus & {
  type: "OFFLINE" | "ONLINE" | "PREMIUM" | "NFT";
  createdAt: number;
  expiredAt?: number;
  serverId: string;
  serverName: string;
  added: number;
  amount: number;
  delay: number;
  details: string;
};

export type EmojiOrderStatus = BaseOrderStatus & {
  type: "REACT";
  created: number;
  value: string;
  emoji: string | null;
  serverId?: string;
  channelId?: string;
  messageId?: string;
  added: number;
  quantity: number;
  delay: number;
  error?: string;
};

export type ButtonOrderStatus = BaseOrderStatus & {
  createdAt: number;
  serverId: string;
  serverName: string;
  payload: string;
  button_id: string;
  added: number;
  amount: number;
  delay: number;
  details: string;
};

export type BoostOrderStatus = BaseOrderStatus & {
  created_at: number;
  duration: CreateBoostDuration;
  serverId: string;
  serverName: string;
  boosts: number;
  details: string;
};

export type OrderStatus =
  | MembersOrderStatus
  | EmojiOrderStatus
  | ButtonOrderStatus
  | BoostOrderStatus;
