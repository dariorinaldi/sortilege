import moment from "moment";
const DEFAULTS = { sortDir: "ASC", sortObjectField: null, throwError: false };

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

const getValueByPath = (propertyName, object) => {
  const parts = propertyName.split(".");
  return parts.reduce((acc, curr) => {
    return acc[curr];
  }, object);
};

const fallbackSortObjectField = item => {
  let sortObjectField = Array.isArray(item) ? "0" : Object.keys(item)[0];
  if (typeof item[sortObjectField] === "object") {
    sortObjectField += `.${fallbackSortObjectField(item[sortObjectField])}`;
  }
  return sortObjectField;
};

const compare = (a, b, sortDir, sortObjectField, throwError) => {
  //gets types
  const typeA = getType(a);
  const typeB = getType(b);
  //clones parameters for manipulation
  let itemA = a;
  let itemB = b;

  //if we have different types in the list, error is thrown
  if (typeA !== typeB || Array.isArray(itemA) !== Array.isArray(itemB)) {
    if (throwError) {
      throw new Error("Different types cannot be compared");
    }
    return 0;
  }

  //array of objects or array of arrays
  if (typeA === "object") {
    //fallback for missing sortObjectField
    if (!sortObjectField) {
      sortObjectField = fallbackSortObjectField(itemA);
    }
    //given the path in sortObjectField (path.to.key) gets the correct value to compare
    itemA = getValueByPath(sortObjectField, a);
    itemB = getValueByPath(sortObjectField, b);

    //throws error for undefined values
    if (itemA === undefined) {
      if (throwError) {
        throw new Error(
          `Specified sortObjectField has not been found in item ${a}`
        );
      }
      return 0;
    }
    if (itemB === undefined) {
      if (throwError) {
        throw new Error(
          `Specified sortObjectField has not been found in item ${b}`
        );
      }
      return 0;
    }
  }

  //sort function
  return sortDir === "DESC" ? desc(itemA, itemB) : asc(itemA, itemB);
};

/** A function to sort an array in a type-aware mode
 * @param {Array.<any>} items  - Array to sort. The items have to be of the same type
 * @param [{Object}] options - Include options parameters to be used
 * @param {string='ASC'} options.sortDir  - Direction to sort to. It can be 'ASC' or 'DESC'
 * @param {string||Array.strings=null} options.sortObjectField - In case of objects array, the field to use to sort, if null fallsback to first key in object
 * @param {boolean=true} options.throwError - If set to true in case of error returns the error, otherwise returns the array in the original order
 * @return {Array.<any>} - The sorted array
 */
const sort = (items, options) => {
  const { sortDir, sortObjectField, throwError } = getOptions(options);
  return items.sort((a, b) =>
    compare(a, b, sortDir, sortObjectField, throwError)
  );
};

export default sort;
