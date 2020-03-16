import React, { Component } from "react";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import CardContainer from "../CardContainer/CardContainer";
import OpenScroll from "../OpenScroll/OpenScroll";
import Favorites from "../Favorites/Favorites";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      favoritesCount: 0,
      favoritesArray: [],
      currentSubject: "",
      buttonClicked: "openScroll",
      filmData: [],
      data: []
    };
    this.getSubjectData = this.getSubjectData.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.displayFavorites = this.displayFavorites.bind(this);
  }

  componentDidMount() {
    this.fetchFilms("films");
  }

  removeStateData(stateDataItem) {
    const toggledStateObj = Object.assign({}, stateDataItem[0], {
      starred: false
    });
    const dataIndex = this.state.data.indexOf(stateDataItem[0]);
    this.state.data.splice(dataIndex, 1, toggledStateObj);
  }

  removeFaveData(favesDataItem) {
    const toggledFavesObj = Object.assign({}, favesDataItem[0], {
      starred: false
    });
    const favesIndex = this.state.favoritesArray.indexOf(favesDataItem[0]);
    this.state.favoritesArray.splice(favesIndex, 1);

    this.setState({
      favoritesCount: this.state.favoritesArray.length,
      favoritesArray: this.state.favoritesArray,
      data: this.state.data
    });
  }

  addToFavesArray(stateDataItem) {
    const toggledStateObj = Object.assign({}, stateDataItem[0], {
      starred: true
    });
    const dataIndex = this.state.data.indexOf(stateDataItem[0]);
    this.state.data.splice(dataIndex, 1, toggledStateObj);
    const newFavoritesArray = [...this.state.favoritesArray, toggledStateObj];
    this.setState({
      favoritesCount: newFavoritesArray.length,
      favoritesArray: newFavoritesArray,
      data: this.state.data
    });
  }

  toggleFavorite(id) {
    const stateDataItem = this.state.data.filter(object => object.id === id);
    const favesDataItem = this.state.favoritesArray.filter(
      object => object.id === id
    );

    switch (true) {
      case stateDataItem.length === 1 && favesDataItem.length === 1:
        this.removeStateData(stateDataItem);
        this.removeFaveData(favesDataItem);
        break;
      case favesDataItem.length === 1:
        this.removeFaveData(favesDataItem);
        break;
      case stateDataItem.length === 1:
        this.addToFavesArray(stateDataItem);
        break;
      default:
        break;
    }
  }

  displayFavorites() {
    this.setState({ buttonClicked: "favorites", currentSubject: "favorites" });
  }

  fetchHomeworld(peopleResults) {
    const peopleArray = peopleResults.map(person => {
      return fetch(person.homeworld).then(response =>
        response.status >= 400
          ? this.setState({ buttonClicked: "error" })
          : response.json()
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
  }

  fetchSpecies(updatedPeopleResults) {
    const completePeopleArray = updatedPeopleResults.map(person => {
      return fetch(person.species[0]).then(response =>
        response.status >= 400
          ? this.setState({ buttonClicked: "error" })
          : response.json()
      );
    });
    return Promise.all(completePeopleArray).then(response => {
      return response.map((species, i) => {
        return Object.assign(updatedPeopleResults[i], {
          species: species.name
        });
      });
    });
  }

  fetchResidents(planetResidentsArray) {
    const planetResidents = planetResidentsArray.map(endpoint => {
      return fetch(endpoint).then(response =>
        response.status >= 400
          ? this.setState({ buttonClicked: "error" })
          : response.json()
      );
    });
    return Promise.all(planetResidents).then(response => {
      return response.map(resident => {
        return resident.name;
      });
    });
  }

  fetchPlanets(planetResults) {
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
  }

  fetchVehicles(vehiclesArray) {
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
  }

  fetchFilms(subject) {
    fetch(`https://swapi.co/api/${subject}/`)
      .then(response =>
        response.status >= 400
          ? this.setState({ buttonClicked: "error" })
          : response.json()
      )
      .then(parsedResponse => this.cleanFilmData(parsedResponse))
      .then(filmsArray => this.setState({ filmData: filmsArray }))
      .catch(error => console.log(error));
  }

  cleanFilmData(dataObject) {
    const filmsArray = dataObject.results.map(obj => {
      return Object.assign(
        {},
        {
          id: obj.title,
          starred: false,
          title: obj.title,
          year: obj.release_date,
          crawl: obj.opening_crawl
        }
      );
    });
    return filmsArray;
  }

  mutateFavoritedData(dataArray) {
    if (this.state.favoritesArray.length > 0) {
      const favesIds = this.state.favoritesArray.map(object => object.id);

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
  }

  getSubjectData(string) {
    this.setState({ buttonClicked: "loading" }, () => {
      if (string === "films") {
        this.setState({
          buttonClicked: "subjectData",
          currentSubject: string,
          data: this.state.filmData
        });
      } else {
        fetch(`https://swapi.co/api/${string}/`)
          .then(response =>
            response.status >= 400
              ? this.setState({ buttonClicked: "error" })
              : response.json()
          )
          .then(parsedResponse => {
            switch (string) {
              case "people":
                return this.fetchHomeworld(parsedResponse.results);
                break;
              case "planets":
                return this.fetchPlanets(parsedResponse.results);
                break;
              case "vehicles":
                return this.fetchVehicles(parsedResponse.results);
                break;
              default:
                break;
            }
          })
          .then(results => {
            switch (string) {
              case "people":
                return this.fetchSpecies(results);
                break;
              default:
                return results;
                break;
            }
          })
          .then(results => {
            const mutatedData = this.mutateFavoritedData(results);
            this.setState({
              buttonClicked: "subjectData",
              currentSubject: string,
              data: mutatedData
            });
          })
          .catch(error => console.log(error));
      }
    });
  }

  render() {
    const {
      filmData,
      buttonClicked,
      currentSubject,
      data,
      favoritesCount,
      favoritesArray
    } = this.state;

    const renderOpenScroll =
      filmData.length > 0 && buttonClicked === "openScroll" ? (
        <OpenScroll filmData={filmData} />
      ) : (
        false
      );

    const renderError = buttonClicked === "error" ? <Error /> : false;

    const renderLoading = buttonClicked === "loading" ? <Loading /> : false;

    const renderFavorites =
      buttonClicked === "favorites" ? (
        <Favorites
          favoritesArray={favoritesArray}
          toggleFavorite={this.toggleFavorite}
        />
      ) : (
        false
      );

    const renderSubjectData =
      buttonClicked === "subjectData" ? (
        <CardContainer stateData={data} toggleFavorite={this.toggleFavorite} />
      ) : (
        false
      );

    return (
      <div className="App">
        <Header
          getSubjectData={this.getSubjectData}
          count={favoritesCount}
          displayFavorites={this.displayFavorites}
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
}

export default App;
