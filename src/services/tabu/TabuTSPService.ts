import { getIndexedArray } from "../../utils/Utils";
import { City, Movement, Round } from "../../models/TSP";
import { random, sqrt, round } from "mathjs";
import { Fifo } from "../../utils/Fifo";

const CITIES_COUNT = 100;

const generateCities = (count: number) => {
  return getIndexedArray(count).map(i => {
    const city: City = {
      id: i,
      position: getIndexedArray(2).map(_ => Number(random(0, 10).toFixed(4)))
    };
    return city;
  });
};

const getData = () => {
  const cities = generateCities(CITIES_COUNT);
  const fifo = new Fifo<Movement>(1000);

  const winners = getIndexedArray(100).map(roundID => {
    const visitedCities: City[] = [];
    for (let id = 0; id < cities.length; id++) {
      const city = getCity(visitedCities, cities, fifo);
      if (id > 0) {
        const lastVisitedCity = visitedCities[visitedCities.length - 1];
        fifo.pop({ fromCityID: lastVisitedCity.id, toCityID: city.id });
      }
      visitedCities.push(city);
    }
    const length = visitedCities.reduce((acc, x, index, arr) => {
      if (index === 0) {
        return acc + 0;
      }
      const previousCity = arr[index - 1];
      const distance = sqrt(
        x.position.reduce(
          (sum, e, i) => sum + Math.pow(e - previousCity.position[i], 2),
          0
        )
      );
      return acc + Number(round(distance, 4));
      // tslint:disable-next-line:align
    }, 0);
    const r: Round = {
      roundID: roundID,
      length: length
    };
    return r;
  });
  console.log(winners);
};

const getCity = (
  visitedCities: City[],
  cities: City[],
  fifo: Fifo<Movement>
) => {
  if (visitedCities.length === 0) {
    const city = cities[Math.round(random(0, cities.length - 1))];
    return city;
  }
  const nonVisitedCities = cities.filter(
    x => visitedCities.filter(e => e.id === x.id).length === 0
  );

  const currentCity = visitedCities[visitedCities.length - 1];
  const availableCities = nonVisitedCities.filter(x => {
    const movement: Movement = {
      fromCityID: currentCity.id,
      toCityID: x.id
    };
    return (
      fifo.items.filter(
        m =>
          m.fromCityID === movement.fromCityID &&
          m.toCityID === movement.toCityID
      ).length === 0
    );
  });
  if (availableCities.length > 0) {
    return availableCities[Math.round(random(0, availableCities.length - 1))];
  }
  return nonVisitedCities[Math.round(random(0, nonVisitedCities.length - 1))];
};

export { generateCities, getData };
