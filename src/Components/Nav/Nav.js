import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import "./Nav.css";

const Nav = ({ getSubjectData, count, displayFavorites, currentSubject }) => {
  const navBtnsArray = ["films", "people", "planets", "vehicles"];
  const mappedBtns = navBtnsArray.map((string, i) => {
    return (
      <Button
        key={i}
        subject={string}
        getSubjectData={getSubjectData}
        currentSubject={currentSubject}
      />
    );
  });

  const activeFavorites =
    currentSubject === "favorites"
      ? "all-favorites-btn fave-active"
      : "all-favorites-btn";

  return (
    <div className="navigation">
      {mappedBtns}
      <button onClick={() => displayFavorites()} className={activeFavorites}>
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
