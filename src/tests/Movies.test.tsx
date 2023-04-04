import Movies from "../components/Movies";
import { render, fireEvent, screen } from "@testing-library/react";

test("renders Movies component without errors", () => {
  render(<Movies />);
});

test("clicking the prev button decreases the page state", () => {
  const prevButton = screen.getByText("prev");
  fireEvent.click(prevButton);
  expect(prevButton).toBeDisabled();
});

test("clicking the next button increases the page state", () => {
  const nextButton = screen.getByText("next");
  fireEvent.click(nextButton);
  expect(nextButton).not.toBeDisabled();
});
