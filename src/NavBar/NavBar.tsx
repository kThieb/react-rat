import React, { useState } from "react";
import "./NavBar.css";

export const NavBar: React.FC = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
};

interface NavItemProps {
  icon: string;
}

export const NavItem: React.FC<NavItemProps> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <p className="icon-button" onClick={() => setOpen(!open)}>
        Algorithms
      </p>
      {open && props.children}
    </li>
  );
};

interface DropDownProps {
  leftIcon?: string;
  rightIcon?: string;
  algorithmName: string;
  changeAlgorithm: (algorithmName: string) => void;
}

export const DropDownMenu: React.FC = (props) => {
  return <div className="dropdown">{props.children}</div>;
};

export const DropDownItem: React.FC<DropDownProps> = (props) => {
  return (
    <div
      className="menu-item"
      onClick={(e) => {
        props.changeAlgorithm(props.algorithmName);
      }}
    >
      {props.children}
    </div>
  );
};
