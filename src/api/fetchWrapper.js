export async function fetchWrapper(url, options = { method: "GET" }) {
  const requestOptions = { ...options };

  if (!requestOptions.headers) {
    requestOptions.headers = {};
  }

  if (
    options.method !== "GET" &&
    requestOptions.headers["Content-Type"] === undefined
  ) {
    requestOptions.headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, requestOptions);

  // Make a best effort to parse the data as JSON, if not just return the raw text.
  let retVal;
  retVal = await response.text();

  try {
    retVal = JSON.parse(retVal);
  } catch (e) {
    retVal = response;
  }

  return retVal;
}
