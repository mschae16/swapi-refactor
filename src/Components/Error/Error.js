import React from "react";
import "./Error.css";

const Error = () => {
  return (
    <div className="error-container">
      <h3>Sorry, we are unable to retrieve your data at this time.</h3>
      <div className="error-image"></div>
      <audio className="error-audio" autoPlay>
        <source
          src="http://www.thesoundarchive.com/starwars/disturbence.mp3"
          autoPlay
        />
      </audio>
    </div>
  );
};

export default Error;
