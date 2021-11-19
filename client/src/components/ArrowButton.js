import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../layouts/styles/ArrowAnimation.scss";

export default function ArrowButton() {
  const onArrowHover = () => {
    if (!document.getElementById("arrow").classList.contains("animate")) {
      document.getElementById("arrow").classList.add("animate");
      setTimeout(() => {
        if (document.getElementById("arrow"))
          document.getElementById("arrow").classList.remove("animate");
      }, 1600);
    }
  };

  useEffect(() => {
    document
      .getElementById("arrow")
      .addEventListener("mouseover", onArrowHover);
    return () => {
      if (document.getElementById("arrow")) {
        document
          .getElementById("arrow")
          .removeEventListener("mouseover", onArrowHover);
      }
    };
  });
  return (
    <>
      <Link to="/editor" className="arrow" id="arrow">
        <i></i>
        <svg>
          <use xlinkHref="#circle" />
        </svg>
      </Link>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 44 44"
          width="44px"
          height="44px"
          id="circle"
          fill="none"
          stroke="currentColor"
        >
          <circle r="20" cy="22" cx="22" id="test" />
        </symbol>
      </svg>
    </>
  );
}
