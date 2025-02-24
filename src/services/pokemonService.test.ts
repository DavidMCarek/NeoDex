import apiGet from "../utils/apiGet";
import { getOnePokemon, getSomePokemon } from "./pokemonService";

vi.mock("../utils/apiGet", () => ({
  default: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe("pokemonService", () => {
  describe("fetchSomePokemon", () => {
    it("should call apiGet with correct query params", async () => {
      vi.mocked(apiGet).mockResolvedValue({
        hasError: false,
      });
      const url = new URL("https://pokeapi.co/api/v2/pokemon/?limit=16&offset=32");

      await getSomePokemon(3);

      expect(apiGet).toHaveBeenCalledWith(url);
    });

    it("should set the lastPage correctly", async () => {
      vi.mocked(apiGet).mockResolvedValue({
        hasError: false,
        data: {
          count: 17,
        },
      });

      const result = await getSomePokemon(1);

      expect(result.lastPage).toBe(2);
    });
  });

  describe("fetchOnePokemon", () => {
    it("should call apiGet with correct url", async () => {
      const url = new URL("https://pokeapi.co/api/v2/pokemon/bulbasaur/");

      await getOnePokemon("bulbasaur");

      expect(apiGet).toHaveBeenCalledWith(url);
    });
  });
});
