import { act, render, screen, waitFor } from "@testing-library/react";
import { getSomePokemon } from "../services/pokemonService";
import { ErrorType } from "../types/serviceResponse";
import { Pokemon } from "../types/pokeApiList";
import PokemonList from "./PokemonList";

vi.mock("../services/pokemonService", () => ({
  getSomePokemon: vi.fn(),
}));

vi.mock("../components/PokemonListItem", () => ({
  default: ({ pokemon }: { pokemon: Pokemon }) => (
    <li data-testid={pokemon.name}>{JSON.stringify(pokemon)}</li>
  ),
}));

vi.mock("../components/Pagination", () => ({
  default: ({ page, lastPage }: { page: number; lastPage: number }) => (
    <div>{`page: ${page} last page: ${lastPage}`}</div>
  ),
}));

const mockPokemonList: Array<Pokemon> = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
];

beforeEach(() => {
  vi.restoreAllMocks();
  vi.mocked(getSomePokemon).mockReset();
});

describe("PokemonList", () => {
  it("should render the header", async () => {
    vi.mocked(getSomePokemon).mockResolvedValue({
      hasError: false,
      lastPage: 0,
    });

    await act(async () => await render(<PokemonList />));

    expect(
      screen.getByRole("heading", { level: 1, name: /Pokemon/i }),
    ).toBeInTheDocument();
  });

  it("should fetch and display a list of pokemon", async () => {
    vi.mocked(getSomePokemon).mockResolvedValue({
      hasError: false,
      lastPage: 1,
      data: { results: mockPokemonList, count: 2, next: "", previous: "" },
    });

    await act(async () => await render(<PokemonList />));

    await waitFor(() => {
      expect(screen.getByTestId("bulbasaur")).toBeInTheDocument();
      expect(screen.getByTestId("charmander")).toBeInTheDocument();
    });
  });

  it("should display an error message when the API returns an HTTP error", async () => {
    vi.mocked(getSomePokemon).mockResolvedValue({
      hasError: true,
      errorType: ErrorType.HttpError,
      lastPage: 0,
    });

    await act(async () => await render(<PokemonList />));

    await waitFor(() => {
      expect(screen.getByText("Sorry, the service is unavailable")).toBeInTheDocument();
    });
  });

  it("should display an error message when the API returns an internal error", async () => {
    vi.mocked(getSomePokemon).mockResolvedValue({
      hasError: true,
      errorType: ErrorType.InternalError,
      lastPage: 0,
    });

    await act(async () => await render(<PokemonList />));

    await waitFor(() => {
      expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    });
  });

  it("should display pagination controls", async () => {
    vi.mocked(getSomePokemon).mockResolvedValue({
      hasError: false,
      lastPage: 1,
      data: { results: mockPokemonList, count: 2 },
    });

    await act(async () => await render(<PokemonList />));

    await waitFor(() => {
      expect(screen.getByText("page: 1 last page: 1")).toBeInTheDocument();
    });
  });
});
