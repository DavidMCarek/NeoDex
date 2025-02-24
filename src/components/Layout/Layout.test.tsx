import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import { ReactNode } from "react";

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
  Outlet: () => <div>Outlet mock</div>,
}));

describe("Layout component", () => {
  it("should render the header and navigation", () => {
    render(<Layout />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should contain a link to the homepage", () => {
    render(<Layout />);

    const homeLink = screen.getByRole("link", { name: /neodex/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should render the Outlet for child components", () => {
    render(<Layout />);

    expect(screen.getByText("Outlet mock")).toBeInTheDocument();
  });
});
