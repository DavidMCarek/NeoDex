import { act, render, screen, waitFor } from "@testing-library/react";
import PokemonListItem from "./PokemonListItem";
import { getOnePokemon } from "../../services/pokemonService";
import { Pokemon } from "../../types/pokeApiList";
import { ReactNode } from "react";

// Mock service function
vi.mock("../../services/pokemonService", () => ({
  getOnePokemon: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  Link: ({
    to,
    children,
    className,
  }: {
    to: string;
    children: ReactNode;
    className: string;
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

const mockPokemon: Pokemon = {
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
};

const mockSrc = "https://test.com/bulbasaur.png";

beforeEach(() => {
  vi.restoreAllMocks();
  vi.mocked(getOnePokemon).mockReset();
});

describe("PokemonListItem", () => {
  it("should render the pokemon name and dex number", async () => {
    vi.mocked(getOnePokemon).mockResolvedValueOnce({
      hasError: false,
      data: { sprites: { front_default: mockSrc }, name: mockPokemon.name, types: [] },
    });

    await act(async () => await render(<PokemonListItem pokemon={mockPokemon} />));

    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
    expect(screen.getByText("DexNo: 1")).toBeInTheDocument();
  });

  it("should fetch and display the pokemon sprite if available", async () => {
    vi.mocked(getOnePokemon).mockResolvedValueOnce({
      hasError: false,
      data: { sprites: { front_default: mockSrc }, name: mockPokemon.name, types: [] },
    });

    await act(async () => await render(<PokemonListItem pokemon={mockPokemon} />));

    await waitFor(() => {
      expect(screen.getByRole("img")).toHaveAttribute("src", mockSrc);
    });
  });

  it("should display No image text when sprite is unavailable", async () => {
    vi.mocked(getOnePokemon).mockResolvedValueOnce({
      hasError: false,
      data: { sprites: { front_default: undefined }, name: mockPokemon.name, types: [] },
    });

    await act(async () => await render(<PokemonListItem pokemon={mockPokemon} />));

    await waitFor(() => {
      expect(screen.getByText("No image")).toBeInTheDocument();
    });
  });

  it("should display No image text when the api cal for sprite fails", async () => {
    vi.mocked(getOnePokemon).mockResolvedValueOnce({
      hasError: true,
    });

    await act(async () => await render(<PokemonListItem pokemon={mockPokemon} />));

    await waitFor(() => {
      expect(screen.getByText("No image")).toBeInTheDocument();
    });
  });

  it("should call getOnePokemon with the correct argument", async () => {
    vi.mocked(getOnePokemon).mockResolvedValueOnce({
      hasError: false,
      data: { sprites: { front_default: mockSrc }, name: mockPokemon.name, types: [] },
    });

    await act(async () => await render(<PokemonListItem pokemon={mockPokemon} />));

    await waitFor(() => {
      expect(getOnePokemon).toHaveBeenCalledWith(mockPokemon.name);
    });
  });

  it("should link to the correct Pokémon page", async () => {
    vi.mocked(getOnePokemon).mockResolvedValueOnce({
      hasError: false,
      data: { sprites: { front_default: mockSrc }, name: mockPokemon.name, types: [] },
    });

    await act(async () => await render(<PokemonListItem pokemon={mockPokemon} />));

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/pokemon/bulbasaur");
  });
});
