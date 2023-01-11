/**
 *
 * @param path Example: dashboard.header.title
 */
export const getObjectValueFromString = (obj: any, path: string) => {
  const arrPath = path.split(".");
  let res = { ...obj };

  for (let i = 0; i < arrPath.length; ++i) {
    res = res?.[arrPath[i]];
    if (res === undefined) {
      return res;
    }
  }
  return res;
};
