import React, { useState, useEffect } from "react";
import {
  fetchSubject,
  fetchHomeWorld,
  fetchPlanets,
  fetchSpecies,
  fetchVehicles
} from "../../api/starWarsApi";

export default function useApp() {
  const [favorites, setFavorites] = useState([]);
  const [currentSubject, setCurrentSubject] = useState("");
  const [buttonClicked, setButtonClicked] = useState("openScroll");
  const [data, setData] = useState([]);

  const loadFilmData = async () => {
    const response = await fetchSubject("films");

    if (response >= 400) {
      setButtonClicked("error");
    } else {
      setData(cleanFilmData(response));
    }
  };

  const cleanFilmData = dataObject => {
    return dataObject.results.map(obj => {
      return {
        id: obj.title,
        starred: false,
        title: obj.title,
        year: obj.release_date,
        crawl: obj.opening_crawl
      };
    });
  };

  useEffect(() => {
    loadFilmData();
  }, []);

  const getNestedData = async (subject, response) => {
    switch (subject) {
      case "people":
        const homeResponse = await fetchHomeWorld(response);

        if (response.status >= 400) {
          setButtonClicked("error");
          return;
        } else {
          return await fetchSpecies(homeResponse);
        }
        break;
      case "planets":
        return await fetchPlanets(response);
        break;
      case "vehicles":
        return fetchVehicles(response);
        break;
      default:
        break;
    }
  };

  const getSubjectData = async subject => {
    setButtonClicked("loading");

    if (subject === "films") {
      loadFilmData();
      setButtonClicked("subjectData");
      setCurrentSubject("films");
      return;
    }

    const response = await fetchSubject(subject);

    if (response.status >= 400) {
      setButtonClicked("error");
    } else {
      const allResults = await getNestedData(subject, response.results);

      const formattedData = mutateFavoritedData(allResults);

      setButtonClicked("subjectData");
      setCurrentSubject(subject);
      setData(formattedData);
    }
  };

  const mutateFavoritedData = dataArray => {
    if (favorites.length > 0) {
      const favesIds = favorites.map(object => object.id);

      const mutatedArray = dataArray.map(object => {
        if (favesIds.includes(object.id)) {
          return Object.assign(object, { starred: true });
        } else {
          return object;
        }
      });
      return mutatedArray;
    } else {
      return dataArray;
    }
  };

  const removeStateData = stateDataItem => {
    const toggledStateObj = Object.assign({}, stateDataItem[0], {
      starred: false
    });
    const dataIndex = data.indexOf(stateDataItem[0]);
    data.splice(dataIndex, 1, toggledStateObj);

    setData(data);
  };

  const removeFaveData = favesDataItem => {
    const toggledFavesObj = Object.assign({}, favesDataItem[0], {
      starred: false
    });
    const favesIndex = favorites.indexOf(favesDataItem[0]);
    favorites.splice(favesIndex, 1);
    let newFaves = [...favorites];

    setFavorites(newFaves);
    setData(data);
  };

  const addToFavesArray = stateDataItem => {
    const toggledStateObj = Object.assign({}, stateDataItem[0], {
      starred: true
    });
    const dataIndex = data.indexOf(stateDataItem[0]);
    data.splice(dataIndex, 1, toggledStateObj);
    const newFavorites = [...favorites, toggledStateObj];

    setFavorites(newFavorites);
    setData(data);
  };

  const displayFavorites = () => {
    setButtonClicked("favorites");
    setCurrentSubject("favorites");
  };

  const toggleFavorite = id => {
    const stateDataItem = data.filter(object => object.id === id);
    const favesDataItem = favorites.filter(object => object.id === id);

    switch (true) {
      case stateDataItem.length === 1 && favesDataItem.length === 1:
        removeStateData(stateDataItem);
        removeFaveData(favesDataItem);
        break;
      case favesDataItem.length === 1:
        removeFaveData(favesDataItem);
        break;
      case stateDataItem.length === 1:
        addToFavesArray(stateDataItem);
        break;
      default:
        break;
    }
  };

  return {
    favorites,
    currentSubject,
    buttonClicked,
    data,
    getSubjectData,
    toggleFavorite,
    displayFavorites
  };
}
