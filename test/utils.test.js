import { verifyOptions } from "../src/utils";
import { arrayList, objectList } from "./mock";

describe("sortilege - happy path", () => {
  it("GIVEN a list of items WHEN items is not an array THEN it should return an error", () => {
    expect(verifyOptions("non-array")).toEqual({
      error: `[items] must be an array`,
      items: "non-array"
    });
  });

  it("GIVEN a list of items and sortBt WHEN items is an array and sortBy is not defined THEN it should not return an error", () => {
    expect(verifyOptions(arrayList)).toEqual({
      error: null,
      items: arrayList
    });
  });

  it("GIVEN a list of items and sortBy WHEN items is an array and sortBy is a string THEN it should not return an error", () => {
    expect(verifyOptions(objectList, "user.name")).toEqual({
      error: null,
      items: objectList
    });
  });

  it("GIVEN a list of items and sortBy WHEN items is an array and sortBy is not an array of strings THEN it should return an error", () => {
    expect(verifyOptions(objectList, [123])).toEqual({
      error: `[sortBy] must be a string or an array of strings`,
      items: objectList
    });
  });

  it("GIVEN a list of items and sortBy WHEN items is an array and sortBy is an array of strings THEN it should not return an error", () => {
    expect(verifyOptions(objectList, ["user.name", "user.id"])).toEqual({
      error: null,
      items: objectList
    });
  });
});
