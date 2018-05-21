import sort from "../src";

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

describe("sortilege - happy path", () => {
  it("GIVEN a list of strings WHEN sort is called without options THEN it should sort in ascending order", () => {
    expect(sort(stringList)).toEqual([
      "andrea",
      "andrea",
      "luca",
      "mario",
      "paolo"
    ]);
  });

  it("GIVEN a list of strings WHEN sort is called with [sortBy] THEN it should sort in descending order", () => {
    expect(sort(stringList, { sortDir: "DESC" })).toEqual([
      "paolo",
      "mario",
      "luca",
      "andrea",
      "andrea"
    ]);
  });

  it("GIVEN a list of arrays WHEN sort is called without options THEN it should sort in ascending order on the 0th field", () => {
    expect(sort(arrayList)).toEqual([
      ["dario", "laura", "federica"],
      ["elisa", "marco", "eleonora"],
      ["flavio", "roberta", "eleonora"],
      ["giovanni", "marco", "fabio"],
      ["luca", "andrea", "marta"]
    ]);
  });

  it("GIVEN a list of arrays WHEN sort is called with [sortBy] THEN it should sort in ascending order by the given field", () => {
    expect(sort(arrayList, { sortBy: "1" })).toEqual([
      ["luca", "andrea", "marta"],
      ["dario", "laura", "federica"],
      ["giovanni", "marco", "fabio"],
      ["elisa", "marco", "eleonora"],
      ["flavio", "roberta", "eleonora"]
    ]);
  });

  it("GIVEN a list of arrays WHEN sort is called with [sortBy] and [sortDir] = DESC THEN it should sort in descending order by the given field", () => {
    expect(sort(arrayList, { sortDir: "DESC", sortBy: "2" })).toEqual([
      ["luca", "andrea", "marta"],
      ["dario", "laura", "federica"],
      ["giovanni", "marco", "fabio"],
      ["flavio", "roberta", "eleonora"],
      ["elisa", "marco", "eleonora"]
    ]);
  });

  it("GIVEN a list of objects WHEN sort is called without options THEN it should sort in ascending order by the first valuable field", () => {
    expect(sort(objectList)).toEqual([
      { user: { name: "andrea", id: 346, birthDate: "1969-02-23" } },
      { user: { name: "andrea", id: 1246, birthDate: "1983-05-24" } },
      { user: { name: "luca", id: 9172, birthDate: "1983-05-25" } },
      { user: { name: "mario", id: 348, birthDate: "1985-04-15" } },
      { user: { name: "paolo", id: 1346, birthDate: "1984-11-10" } }
    ]);
  });

  it("GIVEN a list of objects WHEN sort is called with [sortDir] = DESC THEN it should sort in descending order by the first valuable field", () => {
    expect(sort(objectList, { sortDir: "DESC" })).toEqual([
      { user: { name: "paolo", id: 1346, birthDate: "1984-11-10" } },
      { user: { name: "mario", id: 348, birthDate: "1985-04-15" } },
      { user: { name: "luca", id: 9172, birthDate: "1983-05-25" } },
      { user: { name: "andrea", id: 346, birthDate: "1969-02-23" } },
      { user: { name: "andrea", id: 1246, birthDate: "1983-05-24" } }
    ]);
  });

  it("GIVEN a list of objects WHEN sort is called with [sortBy] THEN it should sort in ascending order by given field", () => {
    expect(sort(objectList, { sortBy: "user.birthDate" })).toEqual([
      { user: { name: "andrea", id: 346, birthDate: "1969-02-23" } },
      { user: { name: "andrea", id: 1246, birthDate: "1983-05-24" } },
      { user: { name: "luca", id: 9172, birthDate: "1983-05-25" } },
      { user: { name: "paolo", id: 1346, birthDate: "1984-11-10" } },
      { user: { name: "mario", id: 348, birthDate: "1985-04-15" } }
    ]);
  });

  it("GIVEN a list of objects WHEN sort is called with [sortBy] and [sortDir] = DESC THEN it should sort in descending order by given field", () => {
    expect(
      sort(objectList, { sortBy: "user.birthDate", sortDir: "DESC" })
    ).toEqual([
      { user: { name: "mario", id: 348, birthDate: "1985-04-15" } },
      { user: { name: "paolo", id: 1346, birthDate: "1984-11-10" } },
      { user: { name: "luca", id: 9172, birthDate: "1983-05-25" } },
      { user: { name: "andrea", id: 1246, birthDate: "1983-05-24" } },
      { user: { name: "andrea", id: 346, birthDate: "1969-02-23" } }
    ]);
  });

  it("GIVEN a list of items WHEN sort is called with multiple [sortBy] THEN it should sort in ascending order by given fields", () => {
    expect(sort(objectList, { sortBy: ["user.name", "user.id"] })).toEqual([
      { user: { name: "andrea", id: 346, birthDate: "1969-02-23" } },
      { user: { name: "andrea", id: 1246, birthDate: "1983-05-24" } },
      { user: { name: "luca", id: 9172, birthDate: "1983-05-25" } },
      { user: { name: "mario", id: 348, birthDate: "1985-04-15" } },
      { user: { name: "paolo", id: 1346, birthDate: "1984-11-10" } }
    ]);
  });

  it("GIVEN a list of items WHEN sort is called with multiple [sortBy] and [sortDir] = DESC THEN it should sort in descending order by given fields", () => {
    expect(
      sort(objectList, { sortDir: "DESC", sortBy: ["user.name", "user.id"] })
    ).toEqual([
      { user: { name: "paolo", id: 1346, birthDate: "1984-11-10" } },
      { user: { name: "mario", id: 348, birthDate: "1985-04-15" } },
      { user: { name: "luca", id: 9172, birthDate: "1983-05-25" } },
      { user: { name: "andrea", id: 1246, birthDate: "1983-05-24" } },
      { user: { name: "andrea", id: 346, birthDate: "1969-02-23" } }
    ]);
  });
});

it("GIVEN a nested list of items WHEN sort is called with multiple [sortBy] THEN it should sort in ascending order by given fields", () => {
  expect(
    sort(objectNestedList, { sortBy: ["name", "address.city.name"] })
  ).toEqual([
    { name: "andrew", address: { city: { name: "Berlin", zipCode: "11011" } } },
    {
      name: "andrew",
      address: { city: { name: "Bruxelles", zipCode: "20100" } }
    },
    {
      name: "christopher",
      address: { city: { name: "Milan", zipCode: "78123" } }
    },
    { name: "luke", address: { city: { name: "Paris", zipCode: "21020" } } },
    {
      name: "mary",
      address: { city: { name: "Manchester", zipCode: "34089" } }
    }
  ]);
});

describe("sortilege - invalid sortBy", () => {
  it("GIVEN a list of arrays WHEN is called with an invalid [sortBy] and [throwError] = false (default) THEN it should return the list as is", () => {
    expect(sort(arrayList, { sortBy: "3" })).toEqual([
      ["luca", "andrea", "marta"],
      ["giovanni", "marco", "fabio"],
      ["dario", "laura", "federica"],
      ["flavio", "roberta", "eleonora"],
      ["elisa", "marco", "eleonora"]
    ]);
  });

  it("GIVEN a list of arrays WHEN is called with an invalid [sortBy] and [throwError] = true (default) THEN it should throw an Error", () => {
    const sortWrapper = () => {
      sort(arrayList, { sortBy: "3", throwError: true });
    };

    expect(sortWrapper).toThrowError(
      /^Specified sortBy \(3\) has not been found on item \["luca","andrea","marta"\].$/
    );
  });
});

describe("sortilege - invalid items", () => {
  it("GIVEN an object WHEN sort and [throwError] = false THEN it should return value as is", () => {
    expect(sort("non-array")).toBe("non-array");
  });

  it("GIVEN an object WHEN sort and [throwError] = true THEN it should throw an error", () => {
    const sortWrapper = () => {
      sort("non-array", { throwError: true });
    };
    expect(sortWrapper).toThrowError(/^Items must be an array$/);
  });

  it("GIVEN an invalid error WHEN sort and [throwError] = true THEN it should throw an error", () => {
    const sortWrapper = () => {
      sort(objectList, { throwError: true, sortBy: ["user.name", 3] });
    };
    expect(sortWrapper).toThrowError(
      /^\[sortBy\] must be a string or an array of strings$/
    );
  });

  it("GIVEN a list of arrays WHEN is called with an invalid list and [throwError] = true THEN it should throw an Error", () => {
    let sorted;
    const sortWrapper = () => {
      sorted = sort(mixedList, { throwError: true });
    };
    expect(sortWrapper).toThrowError(/^Different types cannot be compared$/);
  });

  it("GIVEN a list of arrays WHEN is called with an invalid list and [throwError] = false THEN it should return the list as is", () => {
    expect(sort(mixedList)).toEqual(mixedList);
  });
});
