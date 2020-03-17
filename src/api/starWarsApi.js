export const fetchSubject = async string => {
  return await fetch(`https://swapi.co/api/${string}/`);
};

export const fetchHomeWorld = (peopleResults, setError) => {
  const peopleArray = peopleResults.map(person => {
    return fetch(person.homeworld).then(response =>
      response.status >= 400 ? setError("error") : response.json()
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

export const fetchPlanets = planetResults => {
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

export const fetchResidents = (planetResidentsArray, setError) => {
  const planetResidents = planetResidentsArray.map(endpoint => {
    return fetch(endpoint).then(response =>
      response.status >= 400 ? setError("error") : response.json()
    );
  });
  return Promise.all(planetResidents).then(response => {
    return response.map(resident => {
      return resident.name;
    });
  });
};

export const fetchSpecies = (updatedPeopleResults, setError) => {
  const completePeopleArray = updatedPeopleResults.map(person => {
    return fetch(person.species[0]).then(response =>
      response.status >= 400 ? setError("error") : response.json()
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

export const fetchVehicles = vehiclesArray => {
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
