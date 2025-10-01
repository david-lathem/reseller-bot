import {
  OxaPayFetchOptions,
  ResellerAPIOptions,
  SellHubAPIOptions,
} from "./typings/types.js";

const customFetch = async <T>(
  options: ResellerAPIOptions | OxaPayFetchOptions | SellHubAPIOptions
): Promise<T> => {
  const fetchOptions: RequestInit = {
    method: options.method || "GET",
    headers: {},
  };

  const authorizationHeader: Record<string, string> = {};
  let baseURL = process.env.RESELLER_API_BASE_URL;

  authorizationHeader["Authorization"] = process.env.RESELLER_API_KEY;

  if (options.type === "oxapay") {
    baseURL = process.env.OXAPAY_API_BASE_URL;

    if (options.apiKeyType === "General")
      authorizationHeader["general_api_key"] =
        process.env.OXAPAY_GENERAL_API_KEY;

    if (options.apiKeyType === "Payout")
      authorizationHeader["payout_api_key"] = process.env.OXAPAY_PAYOUT_API_KEY;

    if (options.apiKeyType === "Merchant")
      authorizationHeader["merchant_api_key"] =
        process.env.OXAPAY_MERCHANT_API_KEY;
  }

  if (options.type === "sellhub") {
    baseURL = process.env.SELLHUB_API_BASE_URL;

    authorizationHeader["Authorization"] = process.env.SELLHUB_API_KEY;
  }

  fetchOptions.headers = { ...fetchOptions.headers, ...authorizationHeader };

  if (options.body) fetchOptions.body = JSON.stringify(options.body);

  if (options.additionalHeaders)
    fetchOptions.headers = {
      ...fetchOptions.headers,
      ...options.additionalHeaders,
    };

  const res = await fetch(`${baseURL}${options.url}`, fetchOptions);

  let data;
  if (res.headers.get("content-type")?.includes("text"))
    data = await res.text();
  else data = await res.json();

  if (!res.ok) {
    let message = "Something went wrong"; // default

    if (data.message || data.error) message = data.message ?? data.error; // for reseller
    if (options.type === "oxapay")
      message = `${data.message} ${data.error.message || ""}`; // if oxapay, will override, error can be empty obj

    throw new Error(message);
  }

  return data;
};

export default customFetch;
