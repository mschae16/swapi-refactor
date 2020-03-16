import React from "react";
import Card from "../Card/Card";
import PropTypes from "prop-types";
import "./CardContainer.css";

const CardContainer = ({ stateData, toggleFavorite }) => {
  const subjectCards = () => {
    if (stateData.length > 0) {
      return stateData.map(obj => {
        return (
          <Card
            key={obj.id}
            subjectDataObj={obj}
            toggleFavorite={toggleFavorite}
          />
        );
      });
    }
  };

  return <div className="card-container">{subjectCards()}</div>;
};

CardContainer.propTypes = {
  stateData: PropTypes.array,
  toggleFavorite: PropTypes.func
};

export default CardContainer;
