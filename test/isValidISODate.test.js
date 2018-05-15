import isValidISODate from "../src/isValidISODate";

describe("isValidISODate", () => {
  it("GIVEN some valid ISO dates THEN it should return true", () => {
    const validISOdates = [
      "2008"
      /* "+2018",
      "2008-11",
      "2008-01-31",
      "+2008-09-01T12",
      "-2008-10-25T11:30",
      "2006-03-24T03:45:59",
      "2017-04-15T15:30:00+01",
      "2018-12-15T15:40:00+01:59",
      "2018-12-15T15:40:00Z",
      "1978-W53-2",
      "1983-W01-7" */
    ];

    validISOdates.forEach(date => {
      expect(isValidISODate(date)).toBeTruthy();
    });
  });

  it("GIVEN some unvalid ISO dates THEN it should return false", () => {
    const unvalidISOdates = [
      "20081225",
      "Mar 25 2015",
      "25/12/2017",
      "12-12-2013 15:30.59.0000",
      "Wed Mar 25 2015 01:00:00 GMT+0100"
    ];

    unvalidISOdates.forEach(date => {
      expect(isValidISODate(date)).toBeFalsy();
    });
  });

  it("GIVEN a valid ISO date but unexisting date THEN it should return false", () => {
    const unvalidDate = "+2018-02-31T15:30";

    expect(isValidISODate(unvalidDate)).toBeFalsy();
  });
});
