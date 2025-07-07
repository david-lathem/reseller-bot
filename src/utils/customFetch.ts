import { customFetchOptions } from "./typings/types.js";

const customFetch = async <T>(options: customFetchOptions): Promise<T> => {
  const fetchOptions: RequestInit = {
    method: options.method || "GET",
    headers: {
      Authorization: process.env.RESELLER_API_KEY,
    },
  };

  if (options.body) fetchOptions.body = JSON.stringify(options.body);

  if (options.additionalHeaders)
    fetchOptions.headers = {
      ...fetchOptions.headers,
      ...options.additionalHeaders,
    };

  const res = await fetch(
    `${process.env.RESELLER_API_BASE_URL}${options.url}`,
    fetchOptions
  );

  let data;
  if (res.headers.get("content-type")?.includes("text"))
    data = await res.text();
  else data = await res.json();

  console.log(res);
  console.log(data);

  if (!res.ok) {
    if (data.message || data.error) throw new Error(data.message ?? data.error);
    throw new Error("Something went wrong");
  }

  return data;
};

export default customFetch;
