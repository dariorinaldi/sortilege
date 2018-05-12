import sort from "../src";

const items = [
  { name: { text: "luca", value: 9172 } },
  { name: { text: "andrea", value: 346 } },
  { name: { text: "mario", value: 3 } }
];

test("sort default values -> sortObjectField fallback", () => {
  expect(sort(items)).toEqual([
    { name: { text: "andrea", value: 346 } },
    { name: { text: "luca", value: 9172 } },
    { name: { text: "mario", value: 3 } }
  ]);
});

test("sort descending, tests default values with direction", () => {
  expect(sort(items, { sortDir: "DESC" })).toEqual([
    { name: { text: "mario", value: 3 } },
    { name: { text: "luca", value: 9172 } },
    { name: { text: "andrea", value: 346 } }
  ]);
});

test("sort by nested value, tests iteration for sortObjectFields", () => {
  expect(sort(items, { sortObjectField: "name.value" })).toEqual([
    { name: { text: "mario", value: 3 } },
    { name: { text: "andrea", value: 346 } },
    { name: { text: "luca", value: 9172 } }
  ]);
});
