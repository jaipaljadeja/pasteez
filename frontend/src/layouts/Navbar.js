import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

export default function Navbar() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {}, [userInfo]);

  return (
    <header>
      <a href="/" className="pasteezLogo">
        &lt;/&gt; Pasteez
      </a>
      {userInfo ? (
        <nav>
          <i className="fas fa-bars hamburger"></i>
          <ul className="navlinks">
            <li>
              <a href="/">{userInfo.username}</a>
            </li>
            <li>
              <a href="/" onClick={logoutHandler}>
                Log Out
              </a>
            </li>
          </ul>
        </nav>
      ) : (
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
      )}
    </header>
  );
}
