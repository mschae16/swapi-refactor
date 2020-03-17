import React from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./Favorites.css";

const Favorites = ({ favorites, toggleFavorite }) => {
  const favoriteCards = () => {
    if (favorites.length > 0) {
      return favorites.map(obj => {
        return (
          <Card
            key={obj.id}
            subjectDataObj={obj}
            toggleFavorite={toggleFavorite}
          />
        );
      });
    } else {
      return (
        <div className="empty-faves">
          <h3 className="empty-faves-title">Please favorite a card!</h3>
        </div>
      );
    }
  };

  return <div className="card-container">{favoriteCards()}</div>;
};

Favorites.propTypes = {
  favorites: PropTypes.array,
  toggleFavorite: PropTypes.func
};

export default Favorites;
