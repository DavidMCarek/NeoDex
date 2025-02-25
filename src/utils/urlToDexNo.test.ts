import urlToDexNo from "./urlToDexNo";

describe("urlToDexNo", () => {
  it("should extract dex number from a valid URL", () => {
    expect(urlToDexNo("https://pokeapi.co/api/v2/pokemon/25/")).toBe("25");
  });

  it("should handle URLs without trailing slashes", () => {
    expect(urlToDexNo("https://pokeapi.co/api/v2/pokemon/1")).toBe("1");
  });

  it("should throw an error for an invalid URL", () => {
    expect(() => urlToDexNo("not-a-url")).toThrow();
  });

  it("should throw an error for an empty string input", () => {
    expect(() => urlToDexNo("")).toThrow();
  });
});
