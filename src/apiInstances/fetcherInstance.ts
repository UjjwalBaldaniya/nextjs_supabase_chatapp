export const fetcherInstance = async <T = any>(
  endpoint: string,
  {
    method = "GET",
    body = null,
    headers = {},
  }: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
  } = {}
): Promise<T> => {
  if (!endpoint || typeof endpoint !== "string") {
    throw new Error("Endpoint must be a valid string");
  }

  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const defaultHeaders = isFormData
    ? headers
    : {
        "Content-Type": "application/json",
        ...headers,
      };

  const options: RequestInit = {
    method,
    headers: defaultHeaders,
  };

  if (body) {
    if (isFormData) {
      options.body = body;
      if (options.headers && typeof options.headers === "object") {
        delete (options.headers as Record<string, string>)["Content-Type"];
      }
    } else {
      options.body = JSON.stringify(body);
    }
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || ""}${endpoint}`;
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not set");
  }

  const response = await fetch(apiUrl, options);

  let responseData: any;
  try {
    responseData = await response.json();
  } catch {
    responseData = await response.text();
  }

  if (!response.ok) {
    throw {
      status: response.status,
      message: response.statusText,
      data: responseData,
    };
  }

  return responseData as T;
};
