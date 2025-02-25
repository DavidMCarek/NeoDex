import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useParams } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";
import { getOnePokemon } from "../../services/pokemonService";
import { PokemonDetailResponse } from "../../types/pokeApiDetail";
import { ErrorType } from "../../types/serviceResponse";

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
}));

vi.mock("../../services/pokemonService", () => ({
  getOnePokemon: vi.fn(),
}));

const mockPokemon: PokemonDetailResponse = {
  name: "pikachu",
  height: 4,
  weight: 60,
  sprites: { front_default: "pikachu.png" },
  types: [{ type: { name: "electric" } }],
  game_indices: [{ version: { name: "red" } }, { version: { name: "blue" } }],
  cries: { latest: "pikachu-cry.ogg" },
};

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(useParams).mockReturnValue({ name: mockPokemon.name });
});

describe("PokemonDetail", () => {
  it("should fetch and display Pokemon details", async () => {
    vi.mocked(getOnePokemon).mockResolvedValue({ hasError: false, data: mockPokemon });

    await act(async () => render(<PokemonDetail />));

    await waitFor(() => expect(screen.getByText("pikachu")).toBeInTheDocument());

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByAltText("Sprite for pikachu")).toHaveAttribute(
      "src",
      "pikachu.png",
    );
    expect(screen.getByText("electric")).toBeInTheDocument();
    expect(screen.getByText("1 ft 4 in")).toBeInTheDocument();
    expect(screen.getByText("13.23 lbs")).toBeInTheDocument();
    expect(screen.getByText("red")).toBeInTheDocument();
    expect(screen.getByText("blue")).toBeInTheDocument();
    expect(screen.getByTestId("source-pokemon-cry")).toHaveAttribute(
      "src",
      "pikachu-cry.ogg",
    );
  });

  it("should display an error message when the API returns an HTTP error", async () => {
    vi.mocked(getOnePokemon).mockResolvedValue({
      hasError: true,
      errorType: ErrorType.HttpError,
    });

    await act(async () => render(<PokemonDetail />));

    await waitFor(() => {
      expect(screen.getByText("Sorry, the service is unavailable.")).toBeInTheDocument();
    });
  });

  it("should display an error message when the API returns an internal error", async () => {
    vi.mocked(getOnePokemon).mockResolvedValue({
      hasError: true,
      errorType: ErrorType.InternalError,
    });

    await act(async () => render(<PokemonDetail />));

    await waitFor(() => {
      expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    });
  });
});
