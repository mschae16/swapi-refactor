import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import "./Nav.css";

const navButtons = ["films", "people", "planets", "vehicles"];

const Nav = ({ getSubjectData, count, displayFavorites, currentSubject }) => {
  return (
    <div className="navigation">
      {navButtons.length &&
        navButtons.map((string, i) => {
          return (
            <Button
              key={i}
              subject={string}
              getSubjectData={getSubjectData}
              currentSubject={currentSubject}
            />
          );
        })}
      <button
        onClick={displayFavorites}
        className={`all-favorites-btn ${
          currentSubject === "favorites" ? "fave-active" : ""
        }`}
      >
        favorites
        <span className="favorites-count">{count}</span>
      </button>
    </div>
  );
};

Nav.propTypes = {
  getSubjectData: PropTypes.func,
  count: PropTypes.number,
  displayFavorites: PropTypes.func,
  currentSubject: PropTypes.string
};

export default Nav;
