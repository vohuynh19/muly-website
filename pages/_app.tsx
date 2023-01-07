import { useState } from "react";
import type { AppProps } from "next/app";
import Cookie from "js-cookie";
import { ThemeProvider } from "styled-components";
import { ConfigProvider } from "antd";

import AppContext, {
  defaultUser,
  defaultSetting,
} from "@src/contexts/AppContext";
import { COOKIE_KEY } from "@src/utils/constants/key";
import WalletContextProvider from "@src/contexts/WalletContextProvider";

import { LayoutComponent } from "../components";

import commonLocaleVi from "~/public/locales/vi.json";
import commonLocaleEn from "~/public/locales/en.json";
import questLocaleVi from "@quest/locales/vi.json";
import questLocaleEn from "@quest/locales/en.json";
import profileLocaleVi from "@profile/locales/vi.json";
import profileLocaleEn from "@profile/locales/en.json";

import { themes, GlobalStyle } from "~/styles/theme";
import "../styles/globals.scss";
import { QueryClient, QueryClientProvider } from "react-query";

const localeMapping = {
  vi: {
    quest: questLocaleVi,
    profile: profileLocaleVi,
    common: commonLocaleVi,
  },
  en: {
    quest: questLocaleEn,
    profile: profileLocaleEn,
    common: commonLocaleEn,
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [isDark, setDark] = useState(
    String(Cookie.get(COOKIE_KEY.THEME)) === "true"
  );
  const [localeSetting, setLocaleSetting] = useState({
    lang: Cookie.get(COOKIE_KEY.LANG) || "en",
  });
  const [user, setUser] = useState(defaultUser);
  const [accountSettings, setAccountSettings] = useState(defaultSetting);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          accountSettings,
          setAccountSettings,
          isDark,
          switchTheme: setDark,
          user,
          setUser,
          localeSetting,
          setLocaleSetting,
          localeData: localeMapping,
        }}
      >
        <WalletContextProvider>
          <GlobalStyle />
          <ThemeProvider theme={themes}>
            <ConfigProvider theme={themes}>
              <LayoutComponent>
                <Component {...pageProps} />
              </LayoutComponent>
            </ConfigProvider>
          </ThemeProvider>
        </WalletContextProvider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}
