const pick = <T extends Record<string, unknown>>(
  obj: T,
  options: Array<keyof T>,
): Partial<T> => {
  const finalObj: Partial<T> = {};
  for (const option of options) {
    if (obj && obj.hasOwnProperty.call(obj, option)) {
      finalObj[option] = obj[option];
    }
  }
  return finalObj;
};

export default pick;
