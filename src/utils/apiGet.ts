import { ErrorType, ServiceResponse } from "../types/serviceResponse";

/**
 * Simple fetch wrapper that lets us know if the request succeeds or
 * fails so we can keep track of the error source.
 * @param endpointUrl
 * @returns a promise with the data or error type.
 */
export default async function apiGet<TData>(
  endpointUrl: URL,
): Promise<ServiceResponse<TData>> {
  try {
    const response = await fetch(endpointUrl);
    if (!response.ok)
      return {
        hasError: true,
        errorType: ErrorType.HttpError,
      };

    const data: TData = await response.json();
    return {
      hasError: false,
      data,
    };
  } catch (error) {
    return {
      hasError: true,
      errorType: ErrorType.InternalError,
    };
  }
}
