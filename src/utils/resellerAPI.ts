import customFetch from "./customFetch.js";
import {
  AvailableAmountResponse,
  CreateBoostDuration,
  CreateBoostRequest,
  CreateEmojiButtonOrderPayload,
  CreateEmojiButtonOrderResponse,
  CreateMemberOrderRequest,
  GetBalanceResponse,
  GetMembersResponse,
  OAUTHMemberType,
  orderCreateResponse,
  OrderStatus,
  ServiceTypes,
} from "./typings/types.js";

// GET Requests

export const fetchBalance = async (): Promise<GetBalanceResponse> =>
  customFetch<GetBalanceResponse>({ url: "/balance" });

export const fetchMembers = async (
  service: OAUTHMemberType,
  guildId: string
): Promise<GetMembersResponse> =>
  customFetch<GetMembersResponse>({
    url: `/check?service=${service}&id=${guildId}`,
  });

export const fetchAmountAvailability = async (
  service: ServiceTypes,
  uniqid: string
): Promise<AvailableAmountResponse> => {
  return customFetch<AvailableAmountResponse>({
    url: `/check?service=${service}&uniqid=${uniqid}`,
  });
};

export const fetchOrderStatus = async (
  uniqid: string
): Promise<OrderStatus> => {
  return customFetch({
    url: `/status?uniqid=${uniqid}`,
  });
};
// POST Requests

export const createOAuthOrder = async (
  input: CreateMemberOrderRequest
): Promise<orderCreateResponse> => {
  return customFetch<orderCreateResponse>({
    url: "/order",
    method: "POST",
    additionalHeaders: {
      "Content-Type": "application/json",
    },
    body: input,
  });
};

// EMOJI/Button
export const createEmojiButtonOrder = async (
  payload: CreateEmojiButtonOrderPayload
): Promise<CreateEmojiButtonOrderResponse> => {
  return customFetch({
    url: "/order",
    method: "POST",
    additionalHeaders: { "Content-Type": "application/json" },
    body: payload,
  });
};

export const createBoostOrder = async (
  duration: CreateBoostDuration,
  amount: number,
  link: string
): Promise<orderCreateResponse> => {
  const payload: CreateBoostRequest = {
    service: "NITRO",
    duration,
    amount,
    link,
  };

  return customFetch<orderCreateResponse>({
    url: `/order`,
    method: "POST",
    body: payload,
    additionalHeaders: { "content-type": "application/json" },
  });
};
