import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { Link } from "react-router-dom";
import { removeStatePosts } from "../actions/postsActions";

export default function Navbar() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(removeStatePosts());
    dispatch(logout());
  };

  useEffect(() => {}, [userInfo]);

  return (
    <header>
      <Link to="/" className="pasteezLogo">
        &lt;/&gt; Pasteez
      </Link>
      {userInfo ? (
        <nav>
          <i className="fas fa-bars hamburger"></i>
          <ul className="navlinks">
            <li>
              {/* <Link to="/">{userInfo.username}</Link> */}
              <Link to="/" onClick={logoutHandler}>
                Logout
              </Link>
            </li>
            <li>
              <Link to={`/${userInfo.username}`}>
                {/* <i style={{ fontSize: 30 }} className="fas fa-user-circle" /> */}
                <img
                  src={userInfo.profileIcon}
                  alt="profile-pic"
                  id="navbar-profile-icon"
                  style={{
                    height: "30px",
                    borderRadius: "50%",
                    border: "1.6px solid white",
                    transition: "0.2s ease",
                  }}
                  title={userInfo.username}
                />
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
