import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { Link } from "react-router-dom";

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
              <Link to="/">{userInfo.username}</Link>
            </li>
            <li>
              <Link to="/" onClick={logoutHandler}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <i className="fas fa-bars hamburger"></i>
          <ul className="navlinks">
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
