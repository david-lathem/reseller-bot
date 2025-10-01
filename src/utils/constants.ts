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
  "1d03201b-debd-47a7-905d-d3ad901b94da":
    SELLHUB_TYPES_CONST.THREE_MONTH_BOOST_14,
  "14a4cea9-769a-4f2c-a34b-e7a93af5b3f7":
    SELLHUB_TYPES_CONST.THREE_MONTH_BOOST_20,
  "c709c834-eee0-4a44-8161-5417aba17a09":
    SELLHUB_TYPES_CONST.ONE_MONTH_BOOST_14,
  "a1cfcf9e-76cf-4e07-8200-908a015be79b":
    SELLHUB_TYPES_CONST.ONE_MONTH_BOOST_20,
  "ad86bfcd-5dc5-4bb1-94e3-3c67e937a530": SELLHUB_TYPES_CONST.OFFLINE_MEMBERS,
  "c6917433-d384-4658-be90-7e91bb024cfa": SELLHUB_TYPES_CONST.PREMIUM_MEMBERS,
};
