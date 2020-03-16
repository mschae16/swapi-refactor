import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <h3>LOADING...</h3>
      <div className="darth-image"></div>
      <audio className="loading-audio" autoPlay>
        <source
          src="http://www.thesoundarchive.com/starwars/swvader02.mp3"
          autoPlay
        />
      </audio>
    </div>
  );
};

export default Loading;
