const pick = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  const paginationOptions: Array<keyof T> = [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ];
  const finalObj: Partial<T> = {};
  for (const option of paginationOptions) {
    if (obj && obj.hasOwnProperty.call(obj, option)) {
      finalObj[option] = obj[option];
    }
  }
  return finalObj;
};

export default pick;
