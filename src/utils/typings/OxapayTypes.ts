export type OxaResponse<T> = {
  data: T;
  message: string;
  error:
    | {
        type: string;
        key: string;
        message: string;
      }
    | {};
  status: number;
  version: string;
};

export interface OxaBalanceResponse
  extends OxaResponse<OxaBalanceResponseData> {}

export interface OxaPayoutResponse extends OxaResponse<OxaPayoutResponseData> {}

export interface OxaPayoutStatsResponse
  extends OxaResponse<OxaPayoutStatsData> {}

export interface OxaGenerateInvoiceResponse
  extends OxaResponse<OxaGenerateInvoiceResponseData> {}

export interface OxaInvoiceStatusResponse
  extends OxaResponse<OxaInvoiceStatusResponseData> {}

type OxaBalanceResponseData = {
  BNB: number;
  DGB: number;
  XMR: number;
  BTC: number;
  ETH: number;
  USDC: number;
  POL: number;
  SOL: number;
  NOT: number;
  SHIB: number;
  TRX: number;
  USDT: number;
  DOGS: number;
  TON: number;
  BCH: number;
  DOGE: number;
  LTC: number;
};

export interface OxaPayoutResponseData {
  track_id: string;
  status: string;
}

export interface OxaPayoutPayload {
  address: string;
  currency: string;
  amount: number;
  network?: string | null;
  memo?: string | null;
  description?: string | null;
}

export interface OxaPayoutStatsData {
  // possible undefined dont come in the webhook
  type: "payout";
  track_id: string;
  address: string;
  currency: string;
  network: string;
  amount: number;
  fee?: number;
  status: string;
  tx_hash: string;
  description: string;
  internal?: boolean;
  memo?: string;
  date: number; // UNIX timestamp
}

export interface OxaGenerateInvoicePayload {
  amount: number;
  currency?: string | null;
  lifetime?: number | null;
  fee_paid_by_payer?: number | null;
  under_paid_coverage?: number | null;
  to_currency?: string | null;
  auto_withdrawal?: boolean | null;
  mixed_payment?: boolean | null;
  callback_url?: string | null;
  return_url?: string | null;
  email?: string | null;
  order_id?: string | null;
  thanks_message?: string | null;
  description?: string | null;
  sandbox?: boolean;
}

export interface OxaGenerateInvoiceResponseData {
  track_id: string;
  payment_url: string;
  expired_at: number;
  date: number;
}

export interface OxaInvoiceTx {
  tx_hash: string;
  amount?: number;
  sent_amount?: number; // in webhook NOT API
  received_amount?: number; // in webhook NOT API
  currency: string;
  network: string;
  address?: string;
  sender_address?: string; // in webhook
  status: string;
  confirmations: number;
  auto_convert?: {
    processed: boolean;
    amount: number;
    currency: string;
  };
  auto_withdrawal?: {
    processed: boolean;
  };
  date: number;
}

export interface OxaInvoiceStatusResponseData {
  //optional fields occur in API response or webhook NOT both
  track_id: string;
  type: "invoice";
  amount: number;
  currency: string;
  status: string;
  mixed_payment?: boolean;
  fee_paid_by_payer: number;
  under_paid_coverage: number;
  lifetime?: number;
  callback_url: string;
  return_url: string;
  email: string;
  order_id: string;
  description: string;
  thanks_message: string;
  expired_at?: number;
  date: number;
  txs: OxaInvoiceTx[];
}
