type City = {
  id: number;
  position: number[];
};

type Movement = {
  fromCityID: number;
  toCityID: number;
};

type Round = {
  roundID: number;

  length: number;
};

export { City, Movement, Round };
