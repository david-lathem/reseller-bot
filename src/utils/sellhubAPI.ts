import customFetch from "./customFetch.js";

export const refundSellhubInvoice = async (invoiceId: string): Promise<{}> =>
  customFetch<{}>({
    type: "sellhub",
    url: `/invoices/${invoiceId}/refund/balance`,
    method: "POST",
  });
