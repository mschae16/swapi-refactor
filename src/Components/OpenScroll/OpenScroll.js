import React from "react";
import PropTypes from "prop-types";
import "./OpenScroll.css";

const OpenScroll = ({ filmData }) => {
  let randomFilmObj = filmData[Math.floor(Math.random() * filmData.length)];

  return (
    <div className="outer-container">
      <div className="fade"></div>
      <div className="scroll-container">
        <div className="inner-container">
          <div className="title-yr-container">
            <h3>{randomFilmObj.title}</h3>
            <h4>{randomFilmObj.year}</h4>
          </div>
          <p className="crawl-text">{randomFilmObj.crawl}</p>
        </div>
      </div>
    </div>
  );
};

OpenScroll.propTypes = {
  filmData: PropTypes.array
};

export default OpenScroll;
