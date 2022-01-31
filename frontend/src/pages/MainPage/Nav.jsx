import React from "react";

function Nav({ onLogout }) {
  return (
    <div className="nav">
      <h1 className="logo">SisRepo</h1>
      <button onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default Nav;
