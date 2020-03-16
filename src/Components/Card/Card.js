import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ subjectDataObj, toggleFavorite }) => {
  const cardId = subjectDataObj.id;
  const starredStatus = subjectDataObj.starred
    ? "favorite-btn starred"
    : "favorite-btn";

  const cardKeys = Object.keys(subjectDataObj);
  const filteredArray = cardKeys.filter(
    key => key !== "id" && key !== "starred"
  );
  const keyArray = filteredArray.map(key => {
    return (
      <h3 key={key} className="card-info">
        {" "}
        {key}: {subjectDataObj[key]}{" "}
      </h3>
    );
  });

  return (
    <div className="data-card">
      <div className="subject-info">{keyArray}</div>
      <button className={starredStatus} onClick={() => toggleFavorite(cardId)}>
        favorite
      </button>
    </div>
  );
};

Card.propTypes = {
  subjectDataObj: PropTypes.object,
  toggleFavorite: PropTypes.func
};

export default Card;
