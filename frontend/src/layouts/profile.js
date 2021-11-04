import React from "react";

export default function Profile() {
  return (
    <div className="main-container">
      <div className="profile-header">
        <div className="profile-header-upper">
          <div className="contents-left">
            <div className="profile-image-container">
              <img src={"https://i.imgur.com/MVN67Dv.jpg"} alt="profile-pic" />
            </div>
          </div>
          <div className="contents-right">
            <ul>
              <li>Bhavya Gosai</li>
              <li>@bbSempai</li>
            </ul>
          </div>
        </div>
        <div className="profile-header-lower">
          <div className="contents-left" />
          <div className="contents-right">
            <p>
              Enthusiastic and hard-working sophmore impassionately studying
              Computer Science and have a deep inquisitiveness for coding. Love
              making highly attractive user interfaces including efficiently
              working websites/applications and other artwork. Spending my major
              time sheltering in music, reading books, gathering knowledge and
              trying to contribute towards open source, no matter tech/non-tech,
              I aspire to be the best version of myself and make a positive
              impact on the world. Apart from coding, I also love researching
              about space and astronomy. I am a professional Swimmer, Badminton
              player and love playing Football too.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
