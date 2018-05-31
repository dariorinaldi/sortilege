import isValidISODate from "./isValidISODate";
import { verifyOptions } from "./utils";

const DEFAULTS = { sortDir: "ASC", sortBy: null, throwError: false };

const getOptions = options => {
  return {
    ...DEFAULTS,
    ...options
  };
};

const getType = val => {
  const type = typeof val;
  if (type === "string") {
    return isValidISODate(val) ? "date" : "string";
  }
  return type;
};

const asc = (a, b, indexA, indexB) => {
  if (a > b) return 1;
  if (b > a) return -1;
  return indexA - indexB; //if value is the same, preserves asc order of the original set
};

const desc = (a, b, indexA, indexB) => {
  if (a > b) return -1;
  if (b > a) return 1;
  return indexA - indexB; //if value is the same, preserves desc order of the original set
};

const getValueByPath = (propertyName, object) => {
  const parts = propertyName.split(".");
  return parts.reduce((acc, curr) => {
    return acc[curr];
  }, object);
};

const fallbacksortBy = item => {
  let sortBy = Array.isArray(item) ? "0" : Object.keys(item)[0];
  if (typeof item[sortBy] === "object") {
    sortBy += `.${fallbacksortBy(item[sortBy])}`;
  }
  return sortBy;
};

//list is items data with a progressive id to preserve order if value is the same
const putIndexes = items => {
  return items.map((data, id) => ({ id: id, data: data }));
};

const checkForDifferentTypes = (itemA, itemB) => {
  if (
    getType(itemA) !== getType(itemB) ||
    Array.isArray(itemA) !== Array.isArray(itemB)
  ) {
    throw new Error("Different types cannot be compared");
  }
};

const compare = (a, b, sortDir, sortBy, throwError) => {
  //clones parameters for manipulation
  let itemA = { ...a.data };
  let itemB = { ...b.data };
  let sortParameter = sortBy;

  //if we have different types in the list, error is thrown
  checkForDifferentTypes(itemA, itemB);

  //array of objects or array of arrays
  if (getType(itemA) === "object") {
    //fallback for missing sortParameter
    if (!sortParameter || !sortParameter.length) {
      sortParameter = fallbacksortBy(itemA);
    }

    //given the path in sortBy (path.to.key) gets the correct value to compare
    itemA = getValueByPath(sortParameter, itemA);
    itemB = getValueByPath(sortParameter, itemB);

    checkForDifferentTypes(itemA, itemB);

    //throws error for undefined values
    if (itemA === undefined) {
      throw new Error(
        `Specified sortBy (${sortBy}) has not been found on item ${JSON.stringify(
          a.data
        )}.`
      );
    }
    if (itemB === undefined) {
      throw new Error(
        `Specified sortBy (${sortBy}) has not been found on item ${JSON.stringify(
          b.data
        )}.`
      );
    }
  }

  //sort function
  return sortDir === "DESC"
    ? desc(itemA, itemB, a.id, b.id)
    : asc(itemA, itemB, a.id, b.id);
};

const execSort = (list, sortDir, sortBy, throwError) => {
  try {
    return list.sort((a, b) => compare(a, b, sortDir, sortBy, throwError));
  } catch (err) {
    if (throwError) throw err;
    return null;
  }
};

const calculateSorted = ({ items, sortDir, sortBy, throwError }) => {
  if (!sortBy || !Array.isArray(sortBy)) {
    return execSort(putIndexes(items), sortDir, sortBy, throwError);
  }
  // Sorts and gets data of lists in reverse order (priority) of given sortBy array
  return sortBy.reverse().reduce((acc, curr) => {
    const newList = execSort(acc, sortDir, curr, throwError);
    return newList ? putIndexes(newList.map(val => val.data)) : acc;
  }, putIndexes(items));
};

/** A function to sort an array in a type-aware mode
 * @param {Array.<any>} items  - Array to sort. The items have to be of the same type
 * @param [{Object}] options - Include options parameters to be used
 * @param {string='ASC'} options.sortDir  - Direction to sort to. It can be 'ASC' or 'DESC'
 * @param {string||Array.strings=null} options.sortBy - In case of objects array, the field(s) to use to sort, if null fallsback to first key in object
 * @param {boolean=true} options.throwError - If set to true in case of error returns the error, otherwise returns the array in the original order
 * @return {Array.<any>} - The sorted array
 */
const sort = (items, options) => {
  const { sortDir, sortBy, throwError } = getOptions(options);
  // Check options conditions
  const isValidOptions = verifyOptions(items, sortBy);
  if (isValidOptions.error) {
    if (throwError) {
      throw new Error(isValidOptions.error);
    }
    return items;
  }

  const sorted = calculateSorted({ items, sortDir, sortBy, throwError });

  return sorted ? sorted.map(val => val.data) : items;
};

export default sort;
