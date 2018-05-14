import sort from "../src";

const items = [
  { name: { text: "luca", value: 9172 } },
  { name: { text: "andrea", value: 346 } },
  { name: { text: "mario", value: 346 } },
  { name: { text: "paolo", value: 1346 } },
  { name: { text: "andrea", value: 1246 } }
];

test("sort default values -> sortBy fallback", () => {
  expect(sort(items)).toEqual([
    { name: { text: "andrea", value: 346 } },
    { name: { text: "andrea", value: 1246 } },
    { name: { text: "luca", value: 9172 } },
    { name: { text: "mario", value: 346 } },
    { name: { text: "paolo", value: 1346 } }
  ]);
});

test("sort descending, tests default values with direction", () => {
  expect(sort(items, { sortDir: "DESC" })).toEqual([
    { name: { text: "paolo", value: 1346 } },
    { name: { text: "mario", value: 346 } },
    { name: { text: "luca", value: 9172 } },
    { name: { text: "andrea", value: 1246 } },
    { name: { text: "andrea", value: 346 } }
  ]);
});

test("sort by nested value, tests iteration for sortBy", () => {
  expect(sort(items, { sortBy: "name.value" })).toEqual([
    { name: { text: "andrea", value: 346 } },
    { name: { text: "mario", value: 346 } },
    { name: { text: "andrea", value: 1246 } },
    { name: { text: "paolo", value: 1346 } },
    { name: { text: "luca", value: 9172 } }
  ]);
});

test("sort by multiple nested values, tests iteration and reducer for sortBy, in descendent order", () => {
  expect(
    sort(items, { sortDir: "DESC", sortBy: ["name.text", "name.value"] })
  ).toEqual([
    { name: { text: "paolo", value: 1346 } },
    { name: { text: "mario", value: 346 } },
    { name: { text: "luca", value: 9172 } },
    { name: { text: "andrea", value: 1246 } },
    { name: { text: "andrea", value: 346 } }
  ]);
});
