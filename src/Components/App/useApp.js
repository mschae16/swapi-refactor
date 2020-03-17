import React, { useState, useEffect } from "react";
import fetchSubject from "../../api/fetchSubject";

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
      const parsedResponse = response.json();
      setData(cleanFilmData(parsedResponse));
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

  const fetchHomeWorld = peopleResults => {
    const peopleArray = peopleResults.map(person => {
      return fetch(person.homeworld).then(response =>
        response.status >= 400 ? setButtonClicked("error") : response.json()
      );
    });
    return Promise.all(peopleArray).then(response => {
      return response.map((planet, i) => {
        return Object.assign(
          {},
          {
            id: peopleResults[i].name,
            starred: false,
            name: peopleResults[i].name,
            species: peopleResults[i].species
          },
          { homeworld: planet.name, population: planet.population }
        );
      });
    });
  };

  const fetchSpecies = updatedPeopleResults => {
    const completePeopleArray = updatedPeopleResults.map(person => {
      return fetch(person.species[0]).then(response =>
        response.status >= 400 ? setButtonClicked("error") : response.json()
      );
    });
    return Promise.all(completePeopleArray).then(response => {
      return response.map((species, i) => {
        return Object.assign(updatedPeopleResults[i], {
          species: species.name
        });
      });
    });
  };

  const fetchResidents = planetResidentsArray => {
    const planetResidents = planetResidentsArray.map(endpoint => {
      return fetch(endpoint).then(response =>
        response.status >= 400 ? setButtonClicked("error") : response.json()
      );
    });
    return Promise.all(planetResidents).then(response => {
      return response.map(resident => {
        return resident.name;
      });
    });
  };

  const fetchPlanets = planetResults => {
    const planetArray = planetResults.map(planet => {
      const planetResidents = this.fetchResidents(planet.residents);
      return planetResidents;
    });

    return Promise.all(planetArray).then(response => {
      return response.map((array, i) => {
        return Object.assign(
          {},
          {
            id: planetResults[i].name,
            starred: false,
            planet: planetResults[i].name,
            terrain: planetResults[i].terrain,
            population: planetResults[i].population,
            climate: planetResults[i].climate
          },
          { residents: array }
        );
      });
    });
  };

  const fetchVehicles = vehiclesArray => {
    return vehiclesArray.map(vehicle => {
      return Object.assign(
        {},
        {
          id: vehicle.name,
          starred: false,
          vehicle: vehicle.name,
          model: vehicle.model,
          class: vehicle.vehicle_class,
          passengers: vehicle.passengers
        }
      );
    });
  };

  const getNestedData = async (subject, response) => {
    switch (subject) {
      case "people":
        const homeWorldResp = await fetchHomeWorld(response);

        if (response.status >= 400) {
          setButtonClicked("error");
        } else {
          return await fetchSpecies(homeWorldResp.json());
        }
        break;
      case "planets":
        return await fetchPlanets(response);
        break;
      case "vehicles":
        return await fetchVehicles(response);
        break;
      default:
        break;
    }
  };

  const getSubjectData = async subject => {
    setButtonClicked("loading");

    if (subject === "films") {
      setButtonClicked("subjectData");
      setCurrentSubject(subject);
      setData(filmData);
    } else {
      const response = await fetchSubject(subject);

      if (response.status >= 400) {
        setButtonClicked("error");
      } else {
        const parsedResponse = response.json();
        const allResults = await getNestedData(subject, parsedResponse.results);

        const formattedData = mutateFavoritedData(allResults);

        setButtonClicked("subjectData");
        setCurrentSubject(subject);
        setData(formattedData);
      }
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
    const favesIndex = favoritesArray.indexOf(favesDataItem[0]);
    favoritesArray.splice(favesIndex, 1);

    setFavoritesCount(favoritesArray.length);
    setFavoritesArray(favoritesArray);
    setData(data);
  };

  const addToFavesArray = stateDataItem => {
    const toggledStateObj = Object.assign({}, stateDataItem[0], {
      starred: true
    });
    const dataIndex = data.indexOf(stateDataItem[0]);
    data.splice(dataIndex, 1, toggledStateObj);
    const newFavoritesArray = [...favoritesArray, toggledStateObj];

    setFavoritesCount(newFavoritesArray.length);
    setFavoritesArray(newFavoritesArray);
    setData(data);
  };

  const displayFavorites = () => {
    setButtonClicked("favorites");
    setCurrentSubject("favorites");
  };

  const toggleFavorite = id => {
    const stateDataItem = data.filter(object => object.id === id);
    const favesDataItem = favoritesArray.filter(object => object.id === id);

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
    filmData,
    getSubjectData,
    toggleFavorite,
    displayFavorites
  };
}
