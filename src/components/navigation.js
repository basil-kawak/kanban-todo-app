import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navsCon">
      <NavLink
        className="navs"
        to="/completedboards"
        activeClassName="selected"
        exact={true}
      >
        Completed Items
      </NavLink>
      <NavLink className="navs" to="/" activeClassName="selected" exact={true}>
        Home
      </NavLink>
    </div>
  );
};

export default Navigation;
