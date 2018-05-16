import isValidISODate from "./isValidISODate";
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
  return indexB - indexA; //if value is the same, preserves desc order of the original set
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
  let itemA = a.data;
  let itemB = b.data;
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
  //check if items is array
  if (!Array.isArray(items)) {
    if (throwError) {
      throw new Error(`Items must be an array`);
    }
    return items;
  }

  if (sortBy && Array.isArray(sortBy)) {
    if (sortBy.some(i => typeof i !== "string")) {
      if (throwError) {
        throw new Error("[sortBy] must be a string or an array of strings");
      }
      return items;
    }
  } else if (sortBy && typeof sortBy !== "string") {
    if (throwError) {
      throw new Error("[sortBy] must be a string or an array of strings");
    }
    return items;
  }

  //list is items data with a progressive id to preserve order if value is the same
  const list = items.map(function(data, id) {
    return { id: id, data: data };
  });

  let sorted;
  if (!sortBy || !Array.isArray(sortBy)) {
    sorted = execSort(list, sortDir, sortBy, throwError);
  } else {
    //sorts and gets data of lists in reverse order (priority) of given sortBy array
    sorted = sortBy.reverse().reduce((acc, curr) => {
      return execSort(acc, sortDir, curr, throwError);
    }, list);
  }

  return sorted
    ? sorted.map(function(val) {
        return val.data;
      })
    : items;

  return list;
};

export default sort;
