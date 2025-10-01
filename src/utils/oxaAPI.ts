import customFetch from "./customFetch.js";
import {
  OxaBalanceResponse,
  OxaGenerateInvoicePayload,
  OxaGenerateInvoiceResponse,
  OxaInvoiceStatusResponse,
  OxaPayoutPayload,
  OxaPayoutResponse,
  OxaPayoutStatsResponse,
} from "./typings/OxapayTypes.js";

// [GET]
export const fetchOxaBalance = async (): Promise<OxaBalanceResponse> =>
  customFetch<OxaBalanceResponse>({
    url: "/general/account/balance",
    type: "oxapay",
    apiKeyType: "General",
  });

export const fetchOxaPayoutStats = async (
  trackId: number
): Promise<OxaPayoutStatsResponse> =>
  customFetch<OxaPayoutStatsResponse>({
    url: `/payout/${trackId}`,
    type: "oxapay",
    apiKeyType: "Payout",
  });

export const fetchOxaInvoiceStatus = async (
  trackId: number
): Promise<OxaInvoiceStatusResponse> =>
  customFetch<OxaInvoiceStatusResponse>({
    url: `/payment/${trackId}`,
    type: "oxapay",
    apiKeyType: "Merchant",
  });

// [POST]
export const sendOxaPayout = async (
  payload: OxaPayoutPayload
): Promise<OxaPayoutResponse> =>
  customFetch<OxaPayoutResponse>({
    url: "/payout",
    method: "POST",
    body: payload,
    apiKeyType: "Payout",
    type: "oxapay",
  });

export const generateOxaInvoice = async (
  payload: OxaGenerateInvoicePayload
): Promise<OxaGenerateInvoiceResponse> =>
  customFetch<OxaGenerateInvoiceResponse>({
    url: "/payment/invoice",
    method: "POST",
    body: payload,
    apiKeyType: "Merchant",
    type: "oxapay",
  });
