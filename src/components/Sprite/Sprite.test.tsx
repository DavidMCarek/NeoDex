import { render, screen } from "@testing-library/react";
import Sprite from "./Sprite";

describe("Sprite", () => {
  it("should render the image if a src is provided", () => {
    render(<Sprite pokemonName={"charmander"} src="charmander.png" />);

    expect(screen.getByAltText("Sprite for charmander")).toHaveAttribute(
      "src",
      "charmander.png",
    );
  });

  it("should display 'No Image' if src isn't provided", () => {
    render(<Sprite pokemonName={"charmander"} />);

    expect(screen.getByText("No image")).toBeInTheDocument();
  });

  it("should set the alt text to the Pokemon name", () => {
    render(<Sprite pokemonName={"charmander"} src="charmander.png" />);

    expect(screen.getByAltText("Sprite for charmander")).toBeInTheDocument();
  });
});
