import React from "react";
import "./SecondaryHeader.css";

export const SecondaryHeader: React.FC = (props) => {
  return <div className="secondary-header">{props.children}</div>;
};
