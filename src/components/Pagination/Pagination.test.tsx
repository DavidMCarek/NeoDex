import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";
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
}));

describe("Pagination Component", () => {
  it("should render the current page number", () => {
    render(<Pagination page={5} lastPage={10} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should render Previous and Next links with correct hrefs", () => {
    render(<Pagination page={5} lastPage={10} />);

    const previousLink = screen.getByText("Previous");
    const nextLink = screen.getByText("Next");

    expect(previousLink).toHaveAttribute("href", "/dex/4");
    expect(nextLink).toHaveAttribute("href", "/dex/6");
  });

  it("should not render Previous when on page 1", () => {
    render(<Pagination page={1} lastPage={10} />);

    const previousLink = screen.queryByText("Previous");
    expect(previousLink).not.toBeInTheDocument();
  });

  it("should not render Next when on last page", async () => {
    render(<Pagination page={3} lastPage={3} />);

    const nextLink = screen.queryByText("Next");
    expect(nextLink).not.toBeInTheDocument();
  });
});
