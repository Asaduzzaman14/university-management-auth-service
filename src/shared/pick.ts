// ["page", "Limit", "sortBy", "sortOrder"]

const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
): Partial<T> => {
  const finalObject: Partial<T> = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObject[key] = obj[key];
    }
  }
  console.log(finalObject, 'fffFffff');

  return finalObject;
};

export default pick;
