import React from "react";
import { render } from "@testing-library/react";
import PathFindingVisualizer from "./PathFindingVisualizer";

test("renders learn react link", () => {
  const { getByText } = render(<PathFindingVisualizer />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
