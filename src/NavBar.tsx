import React, { useState } from "react";
import "./NavBar.css";

interface NavItemProps {
  icon: string;
}

export const NavBar: React.FC = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
};

export const NavItem: React.FC<NavItemProps> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        Algorithms
      </a>
      {open && props.children}
    </li>
  );
};

interface DropDownProps {
  leftIcon?: string;
  rightIcon?: string;
}

export const DropDownMenu: React.FC = (props) => {
  const DropDownItem: React.FC<DropDownProps> = (props) => {
    return (
      <a href="#" className="menu-item">
        {props.children}
      </a>
    );
  };

  return (
    <div className="dropdown">
      <DropDownItem>Dijkstra's algorithm</DropDownItem>
      <DropDownItem>A* Algorithm</DropDownItem>
      <DropDownItem>Greedy Algorithm</DropDownItem>
    </div>
  );
};
