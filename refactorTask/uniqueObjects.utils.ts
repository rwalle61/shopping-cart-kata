const isValueUnique = (array: object[], value, key: string): boolean =>
  !array.some((obj) => obj[key] === value);

// Get the unique objects of this array based on a key
// Just remove the duplicate ones
const getUniqueObjects = <T>(array: T[], key = 'id'): T[] =>
  array.reduce(
    (acc, obj) => (isValueUnique(acc, obj[key], key) ? acc.concat([obj]) : acc),
    [],
  );

export default getUniqueObjects;
