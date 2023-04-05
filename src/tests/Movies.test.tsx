import Movies from "../components/Movies";
import { render, fireEvent, screen } from "@testing-library/react";

test("renders Movies component without errors", () => {
  render(<Movies />);
});
