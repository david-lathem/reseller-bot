import { SELLHUB_TYPE_VALUES, SELLHUB_TYPES_CONST } from "./typings/SellHub.js";
import { CreateBoostDuration } from "./typings/types.js";

export const OAUTH_MEMBERS_TYPES = [
  { name: "OAUTH Offline", value: "OAUTH-OFFLINE" },
  { name: "OAUTH Online", value: "OAUTH-ONLINE" },
  { name: "OAUTH Premium", value: "OAUTH-PREMIUM" },
  { name: "OAUTH NFT", value: "OAUTH-NFT" },
];

export const SERVICE_TYPES = [
  { name: "React Service", value: "REACT" },
  { name: "Button Service", value: "BUTTON" },
];

export const BOOST_DURATION: Record<CreateBoostDuration, CreateBoostDuration> =
  {
    ONE_MONTH: "ONE_MONTH",
    THREE_MONTH: "THREE_MONTH",
  } as const;

export const SELLHUB_VARIANT_TYPE_MAP: Record<string, SELLHUB_TYPE_VALUES> = {
  "d1ba6ccd-29f9-4908-98d3-13181019f8d6": SELLHUB_TYPES_CONST.THREE_MONTH_BOOST,
  "24576d6d-66cf-47df-90b4-37cd4b30291c": SELLHUB_TYPES_CONST.ONE_MONTH_BOOST,
  "877ae6a1-22bb-4a88-a3ba-a2e5987b1ff7": SELLHUB_TYPES_CONST.OFFLINE_MEMBERS,
  "9ee6a0f2-2faa-4050-84fb-7d165c93fbaf": SELLHUB_TYPES_CONST.PREMIUM_MEMBERS,
};
