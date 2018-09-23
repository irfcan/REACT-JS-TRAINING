import React, { Component } from "react";

// OBCEJT DESTRUCTING
//  {props.totalCounters}  yerine  {totalCounters} yaptık ve span içinde totalCounters yazdık sadece

const NavBar = ({ totalCounters }) => {
  console.log("NavBar-Rendered");
  // Stateless function old için Hook Cycle'ı izlemez.Sadece class components Hook Cycle'ı izler

  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        {" "}
        Navbar{" "}
        <span className="badge badge-pill badge-secondary">
          {totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
