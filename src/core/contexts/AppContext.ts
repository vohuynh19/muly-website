import { createContext, useContext, Dispatch } from 'react';
import { ThemeContext } from 'styled-components';

type AppContextType = {
  isDark: boolean;
  switchTheme: Dispatch<boolean>;

  user: UserType;
  setUser: Dispatch<UserType>;

  accountSettings: AccountSetting;
  setAccountSettings: Dispatch<AccountSetting>;

  localeSetting: {
    lang: string;
  };
  setLocaleSetting: Dispatch<LocaleSetting>;

  localeData?: any;
};

export type UserType = {
  _id: string;
  userId: string;
  email: string;
  roleId: string;
  avatar?: string;
};
export type AccountSetting = {
  isTwoFactorAuthentication: boolean;
  isEmailAuthentication: boolean;
  isPhoneAuthentication: boolean;
  isEmailConfirmed: boolean;
  isPhoneConfirmed: boolean;
  isActive: boolean;
  antiPhishingCode: string;
  isEnableFundPassword: boolean;
  isWithdrawalWhitelist: boolean;
  twoFactorCode: string;
};

export type LocaleSetting = {
  lang: string;
};

export const defaultUser = {
  _id: '',
  userId: '',
  email: '',
  roleId: '',
  avatar: '',
};

export const defaultSetting = {
  isTwoFactorAuthentication: false,
  isEmailAuthentication: false,
  isPhoneAuthentication: false,
  isEmailConfirmed: false,
  isPhoneConfirmed: false,
  isActive: false,
  antiPhishingCode: '',
  isEnableFundPassword: false,
  isWithdrawalWhitelist: false,
  twoFactorCode: '',
};

export const defaultLocaleSetting = {
  lang: 'en',
};

export const defaultFunction = () => {};

const appContextDefaultValues: AppContextType = {
  accountSettings: defaultSetting,
  setAccountSettings: defaultFunction,
  isDark: true,
  switchTheme: defaultFunction,
  user: defaultUser,
  setUser: defaultFunction,
  localeSetting: defaultLocaleSetting,
  setLocaleSetting: defaultFunction,
  localeData: {},
};

const AppContext = createContext<AppContextType>(appContextDefaultValues);

export function useAppState() {
  return useContext(AppContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default AppContext;
