import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import CardContainer from "../CardContainer/CardContainer";
import OpenScroll from "../OpenScroll/OpenScroll";
import Favorites from "../Favorites/Favorites";
import useApp from "./useApp";
import "./App.css";

function App() {
  const {
    favorites,
    currentSubject,
    buttonClicked,
    data,
    getSubjectData,
    toggleFavorite,
    displayFavorites
  } = useApp();

  const renderOpenScroll =
    data.length > 0 && buttonClicked === "openScroll" ? (
      <OpenScroll filmData={data} />
    ) : null;

  const renderError = buttonClicked === "error" ? <Error /> : null;
  const renderLoading = buttonClicked === "loading" ? <Loading /> : null;

  const renderFavorites =
    buttonClicked === "favorites" ? (
      <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
    ) : null;

  const renderSubjectData =
    buttonClicked === "subjectData" ? (
      <CardContainer data={data} toggleFavorite={toggleFavorite} />
    ) : null;

  return (
    <div className="App">
      <Header
        getSubjectData={getSubjectData}
        count={favorites.length}
        displayFavorites={displayFavorites}
        currentSubject={currentSubject}
      />
      {renderSubjectData}
      {renderOpenScroll}
      {renderLoading}
      {renderError}
      {renderFavorites}
    </div>
  );
}

export default App;
