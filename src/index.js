import moment from "moment";
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
    return moment(val, [moment.ISO_8601, moment.RFC_2822]).isValid()
      ? "date"
      : "string";
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

const compare = (a, b, sortDir, sortBy, throwError) => {
  //gets types
  const typeA = getType(a.data);
  const typeB = getType(b.data);
  //clones parameters for manipulation
  let itemA = a.data;
  let itemB = b.data;
  let sortParameter = sortBy;

  //if we have different types in the list, error is thrown
  if (typeA !== typeB || Array.isArray(itemA) !== Array.isArray(itemB)) {
    if (throwError) {
      throw new Error("Different types cannot be compared");
    }
    return 0;
  }

  //array of objects or array of arrays
  if (typeA === "object") {
    //fallback for missing sortParameter
    if (!sortParameter || !sortParameter.length) {
      sortParameter = fallbacksortBy(itemA);
    }

    //given the path in sortBy (path.to.key) gets the correct value to compare
    itemA = getValueByPath(sortParameter, itemA);
    itemB = getValueByPath(sortParameter, itemB);

    //throws error for undefined values
    if (itemA === undefined) {
      if (throwError) {
        throw new Error(`Specified sortBy has not been found value ${a}`);
      }
      return 0;
    }
    if (itemB === undefined) {
      if (throwError) {
        throw new Error(`Specified sortBy has not been found in item ${b}`);
      }
      return 0;
    }
  }

  //sort function
  return sortDir === "DESC"
    ? desc(itemA, itemB, a.id, b.id)
    : asc(itemA, itemB, a.id, b.id);
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
      throw new Error(`Items to sort must be enclosed in an array`);
    } else {
      return items;
    }
  }

  //list is items data with a progressive id to preserve order if value is the same
  const list = items.map(function(data, id) {
    return { id: id, data: data };
  });

  if (!sortBy || typeof sortBy === "string") {
    //sorts and gets data of lists
    list.sort((a, b) => compare(a, b, sortDir, sortBy, throwError));

    return list.map(function(val) {
      return val.data;
    });
  }
  if (Array.isArray(sortBy)) {
    //sorts and gets data of lists in reverse order (priority) of given sortBy array
    sortBy.reverse().reduce((acc, curr) => {
      return list.sort((a, b) => compare(a, b, sortDir, curr, throwError));
    }, list);
    return list.map(function(val) {
      return val.data;
    });
  }

  if (throwError) {
    throw new Error(`Specified sortBy must be a string or an array of strings`);
  }
  return list;
};

export default sort;
