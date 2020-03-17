import React from "react";
import Card from "../Card/Card";
import PropTypes from "prop-types";
import "./CardContainer.css";

const CardContainer = ({ data, toggleFavorite }) => {
  const subjectCards = () => {
    if (data.length > 0) {
      return data.map(obj => {
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
  data: PropTypes.array,
  toggleFavorite: PropTypes.func
};

export default CardContainer;
