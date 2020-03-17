import { fetchWrapper } from "./fetchWrapper";

export const fetchSubject = async string => {
  return await fetchWrapper(`https://swapi.co/api/${string}/`);
};

export const fetchHomeWorld = peopleResults => {
  const peopleArray = peopleResults.map(async person => {
    return await fetchWrapper(person.homeworld);
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
  const planetArray = planetResults.map(async planet => {
    return await fetchResidents(planet.residents);
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
        { residents: array.map(item => item.name) }
      );
    });
  });
};

export const fetchResidents = async planetResidents => {
  return Promise.all(
    planetResidents.map(async endpoint => {
      return await fetchWrapper(endpoint);
    })
  );
};

export const fetchSpecies = updatedPeopleResults => {
  const completePeopleArray = updatedPeopleResults.map(async person => {
    return await fetchWrapper(person.species[0]);
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
