const stringList = ["luca", "andrea", "mario", "paolo", "andrea"];

const arrayList = [
  ["luca", "andrea", "marta"],
  ["giovanni", "marco", "fabio"],
  ["dario", "laura", "federica"],
  ["flavio", "roberta", "eleonora"],
  ["elisa", "marco", "eleonora"]
];

const objectList = [
  { user: { name: "luca", id: 9172, birthDate: "1983-05-25" } },
  { user: { name: "andrea", id: 346, birthDate: "1969-02-23" } },
  { user: { name: "mario", id: 348, birthDate: "1985-04-15" } },
  { user: { name: "paolo", id: 1346, birthDate: "1984-11-10" } },
  { user: { name: "andrea", id: 1246, birthDate: "1983-05-24" } }
];

const objectNestedList = [
  { name: "luke", address: { city: { name: "Paris", zipCode: "21020" } } },
  {
    name: "andrew",
    address: { city: { name: "Bruxelles", zipCode: "20100" } }
  },
  { name: "mary", address: { city: { name: "Manchester", zipCode: "34089" } } },
  { name: "andrew", address: { city: { name: "Berlin", zipCode: "11011" } } },
  {
    name: "christopher",
    address: { city: { name: "Milan", zipCode: "78123" } }
  }
];

const mixedList = [
  ["luca", "andrea", "marta"],
  [true, "andrea", "marta"],
  ["marco", 2, "marta"],
  ["fabio", "andrea", "pippo"],
  ["luca", "andrea", 0]
];

export { stringList, arrayList, objectList, objectNestedList, mixedList };
