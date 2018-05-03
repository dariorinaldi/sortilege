import sort from "../src";

const items = [{ name: "luca" }, { name: "andrea" }, { name: "mario" }];

test("sort ascending", () => {
  expect(sort(items)).toEqual([
    { name: "andrea" },
    { name: "luca" },
    { name: "mario" }
  ]);
});

test("sort descending", () => {
  expect(sort(items, "DESC")).toEqual([
    { name: "mario" },
    { name: "luca" },
    { name: "andrea" }
  ]);
});
