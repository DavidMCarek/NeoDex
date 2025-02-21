import apiGet from "../utils/apiGet";
import { getSomePokemon } from "./pokemonService";

vi.mock("../utils/apiGet", () => ({
  default: vi.fn(),
}));

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("pokemonService", () => {
  describe("fetchSomePokemon", () => {
    it("should call apiGet with correct query params", async () => {
      const url = new URL("https://pokeapi.co/api/v2/pokemon/?limit=10&offset=20");

      await getSomePokemon(3);

      expect(apiGet).toHaveBeenCalledWith(url);
    });
  });
});
