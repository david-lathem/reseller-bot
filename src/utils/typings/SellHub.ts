// 1. Define your const object as the single source
export const SELLHUB_TYPES_CONST = {
  THREE_MONTH_BOOST_14: "THREE_MONTH_BOOST_14",
  THREE_MONTH_BOOST_20: "THREE_MONTH_BOOST_20",
  ONE_MONTH_BOOST_14: "ONE_MONTH_BOOST_14",
  ONE_MONTH_BOOST_20: "ONE_MONTH_BOOST_20",
  OFFLINE_MEMBERS: "OAUTH-OFFLINE",
  PREMIUM_MEMBERS: "OAUTH-PREMIUM",
} as const;

// 2. Derive types from it automatically
export type SELLHUB_TYPES = typeof SELLHUB_TYPES_CONST; // { THREE_MONTH_BOOST: "THREE_MONTH_BOOST", ... }
export type SELLHUB_TYPE_KEYS = keyof SELLHUB_TYPES; // "THREE_MONTH_BOOST" | "ONE_MONTH_BOOST" | ...
export type SELLHUB_TYPE_VALUES = SELLHUB_TYPES[SELLHUB_TYPE_KEYS];
// "THREE_MONTH_BOOST" | "ONE_MONTH_BOOST" | "OAUTH-OFFLINE" | "OAUTH-PREMIUM"

// ---------------- Common Base ----------------
export type SellHubInvoice = {
  id: string;
  totalInUsd: string;
};

export type SellHubProduct = {
  id: string;
  name: string;
};

export type SellHubVariant = {
  id: string;
  name: string;
};

export type SellHubCustomer = {
  id: string;
  email: string;
};

export interface SellHubBaseOrder {
  invoice: SellHubInvoice;
  product: SellHubProduct;
  variant: SellHubVariant;
  quantity: number;
  customer: SellHubCustomer;
  customFields: {
    key: string;
    value: string;
  }[];
}

// ---------------- Type: boost ----------------
export interface SellHubBoostOrder extends SellHubBaseOrder {
  type: Exclude<SELLHUB_TYPE_VALUES, "OAUTH-OFFLINE" | "OAUTH-PREMIUM">;
  customFields: {
    key: "Discord Server Invite";
    value: string;
  }[];
}

export interface SellHubOfflineMemberBoostOrder extends SellHubBaseOrder {
  type: SELLHUB_TYPES["OFFLINE_MEMBERS"];

  customFields: {
    key: "Discord Server Id";
    value: string;
  }[];
}

export interface SellHubPremiumMemberBoostOrder extends SellHubBaseOrder {
  type: SELLHUB_TYPES["PREMIUM_MEMBERS"];

  customFields: {
    key: "Discord Server Id";
    value: string;
  }[];
}

// ---------------- Union of all types ----------------
export type SellHubOrder =
  | SellHubBoostOrder
  | SellHubOfflineMemberBoostOrder
  | SellHubPremiumMemberBoostOrder;
