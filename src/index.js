import moment from "moment";

const getType = val => {
  const type = typeof val;
  if (type === "string") {
    return moment(val, [moment.ISO_8601, moment.RFC_2822]).isValid()
      ? "date"
      : "string";
  }
  return type;
};

const asc = (a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
  if (a === b) return 0;
};

const desc = (a, b) => {
  if (a > b) return -1;
  if (b > a) return 1;
  if (a === b) return 0;
};

const getPropertyByPath = (propertyName, object) => {
  const parts = propertyName.split(".");
  let property = object;

  for (let i = 0; i < parts.length; i++) {
    property = property[parts[i]];
  }

  return property;
};

const compare = (a, b, sortDir, sortField, throwError) => {
  const typeA = getType(a);
  const typeB = getType(b);
  let itemA = a;
  let itemB = b;

  if (typeA !== typeB || Array.isArray(itemA) !== Array.isArray(itemB)) {
    if (throwError) {
      throw new Error("Different types cannot be compared");
    }
    return 0;
  }

  if (typeA === "object") {
    if (!sortField) {
      sortField = Array.isArray(itemA) ? "0" : Object.keys(itemA)[0];
    }

    itemA = getPropertyByPath(sortField, a);
    itemB = getPropertyByPath(sortField, b);

    if (itemA === undefined) {
      if (throwError) {
        throw new Error(`Specified sortField has not been found in item ${a}`);
      }
      return 0;
    }

    if (itemB === undefined) {
      if (throwError) {
        throw new Error(`Specified sortField has not been found in item ${b}`);
      }
      return 0;
    }
  }

  return sortDir === "DESC" ? desc(itemA, itemB) : asc(itemA, itemB);
};

/** A function to sort an array in a type-aware mode 
      /* @param {Array.<any>} items  - Array to sort. The items have to be of the same type
      /* @param {string} sortDir  - Direction to sort to. It can be 'ASC' or 'DESC'
      /* @param {string} sortField - In case of objects array, the field to use to sort
      /* @param {boolean} handleError - If set to true in case of error returns the array sorted by the 0th element (or field in case of objects) 
      /* @return {Array.<any>} - The sorted array
      */
const sort = (items, sortDir = "ASC", sortField = null, throwError = false) => {
  return items.sort((a, b) => compare(a, b, sortDir, sortField, throwError));
};

export default sort;
