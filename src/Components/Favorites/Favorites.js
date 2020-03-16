import React from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./Favorites.css";

const Favorites = ({ favoritesArray, toggleFavorite }) => {
  console.log(favoritesArray);
  const favoritedCards = () => {
    if (favoritesArray.length > 0) {
      return favoritesArray.map(obj => {
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
          <div className="empty-image"></div>
          <audio className="empty-faves-audio" autoPlay>
            <source
              src="http://www.thesoundarchive.com/starwars/star-wars-cantina-song.mp3"
              autoPlay
            />
          </audio>
        </div>
      );
    }
  };

  return <div className="card-container">{favoritedCards()}</div>;
};

Favorites.propTypes = {
  favoritesArray: PropTypes.array,
  toggleFavorite: PropTypes.func
};

export default Favorites;
