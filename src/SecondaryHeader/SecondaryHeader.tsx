import React from "react";
import "./SecondaryHeader.css";

// Unused component at the moment
export const SecondaryHeader: React.FC = (props) => {
  return <div className="secondary-header">{props.children}</div>;
};
