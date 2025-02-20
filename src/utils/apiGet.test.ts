import apiGet from "./apiGet";
import { ErrorType } from "../types/serviceResponse";
import { Mock } from "vitest";

globalThis.fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
});

describe("apiGet", () => {
  it("should return data on successful fetch", async () => {
    const mockData = {
      foo: "bar",
    };
    const mockEndpoint = new URL("https://test.com/api/v1/foobar/");

    // This is a little bit of a cop-out to avoid having to define
    // all the properties on the fetch resolve value. Not disimilar
    // from slapping an "any" on the type.
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await apiGet(mockEndpoint);

    expect(result.hasError).toBe(false);
    expect(result.data).toEqual(mockData);
  });

  it("should have an http error if endpoint response not ok", async () => {
    const mockEndpoint = new URL("https://test.com/api/v1/foobar/");

    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
    });

    const result = await apiGet(mockEndpoint);

    expect(result.hasError).toBe(true);
    expect(result.errorType).toEqual(ErrorType.HttpError);
  });

  it("should have an internal error if fetch errors", async () => {
    const mockEndpoint = new URL("https://test.com/api/v1/foobar/");

    (fetch as Mock).mockRejectedValueOnce(new Error("Network Error"));

    const result = await apiGet(mockEndpoint);

    expect(result.hasError).toBe(true);
    expect(result.errorType).toEqual(ErrorType.InternalError);
  });

  it("should have an internal error if deserializing errors", async () => {
    const mockEndpoint = new URL("https://test.com/api/v1/foobar/");

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.reject(),
    });

    const result = await apiGet(mockEndpoint);

    expect(result.hasError).toBe(true);
    expect(result.errorType).toEqual(ErrorType.InternalError);
  });
});
