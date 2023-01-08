import { useLayoutEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Cookie from 'js-cookie';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';

import AppContext, { defaultUser, defaultSetting } from '@src/contexts/AppContext';
import { COOKIE_KEY } from '@src/utils/constants/key';
import createEmotionCache from '@src/utils/functions/createEmotionCache';

import { LayoutComponent } from '../components';
import { themes, GlobalStyle } from '~/styles/theme';
import '../styles/globals.scss';

import commonLocaleVi from '~/public/locales/vi.json';
import commonLocaleEn from '~/public/locales/en.json';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const localeMapping = {
  vi: {
    common: commonLocaleVi,
  },
  en: {
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

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  const [init, setInit] = useState(false);

  const [isDark, setDark] = useState(String(Cookie.get(COOKIE_KEY.THEME)) === 'true');
  const [localeSetting, setLocaleSetting] = useState({
    lang: Cookie.get(COOKIE_KEY.LANG) || 'en',
  });
  const [user, setUser] = useState(defaultUser);
  const [accountSettings, setAccountSettings] = useState(defaultSetting);

  useLayoutEffect(() => {
    setInit(true);
  }, []);

  return (
    init && (
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
          <CacheProvider value={emotionCache}>
            <CssBaseline />
            <GlobalStyle />
            <ThemeProvider theme={themes}>
              <ConfigProvider theme={themes}>
                <LayoutComponent>
                  <Component {...pageProps} />
                </LayoutComponent>
              </ConfigProvider>
            </ThemeProvider>
          </CacheProvider>
        </AppContext.Provider>
      </QueryClientProvider>
    )
  );
}
