import React from "react";

export default function Navbar() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (localStorage.getItem("userInfo")) {
    return (
      <header>
        <a href="/" className="pasteezLogo">
          &lt;/&gt; Pasteez
        </a>
        <nav>
          <i className="fas fa-bars hamburger"></i>
          <ul className="navlinks">
            <li>
              <a href="/">{userInfo.username}</a>
            </li>
            <li>
              <a
                href="/"
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  window.location.reload();
                }}
              >
                Log Out
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  } else {
    return (
      <header>
        <a href="/" className="pasteezLogo">
          &lt;/&gt; Pasteez
        </a>
        <nav>
          <i className="fas fa-bars hamburger"></i>
          <ul className="navlinks">
            <li>
              <a href="/signup">Sign Up</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
