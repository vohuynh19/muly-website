import { useCallback, useContext } from "react";
import AppContext from "../contexts/AppContext";
import { getObjectValueFromString } from "@utils/functions/getObjectValueFromString";

export const useLocale = (initPath = "") => {
  const { localeSetting, localeData } = useContext(AppContext);

  const t = useCallback(
    (path: string) => {
      return (
        getObjectValueFromString(
          localeData[localeSetting.lang],
          initPath.trim() ? `${initPath}.${path}` : path
        ) || path
      );
    },
    [localeSetting, initPath, localeData]
  );

  return { t };
};
