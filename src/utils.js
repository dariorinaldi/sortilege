const verifyOptions = (items, sortBy) => {
  if (!Array.isArray(items)) {
    return { error: `[items] must be an array`, items };
  }

  if (sortBy && Array.isArray(sortBy)) {
    if (sortBy.some(i => typeof i !== "string")) {
      return {
        error: `[sortBy] must be a string or an array of strings`,
        items
      };
    }
  } else if (sortBy && typeof sortBy !== "string") {
    return {
      error: `[sortBy] must be a string or an array of strings`,
      items
    };
  }

  return { error: null, items };
};

export { verifyOptions };
