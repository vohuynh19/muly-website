import { createGlobalStyle } from 'styled-components';
import { Roboto } from '@next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
});

export const themes = {
  colors: {
    hBg: '#222222',
    bg: '#121212',
    sBg: '#000000',
    border: '#333',
    primary: '#ce1212',
    positive: '#66BFBF',
    negative: '#FF0063',
    text: '#f9f9f9',
    secondaryText: '#aaa',
    icon: '#6f7d95',
  },
  spaces: {
    sm: '4px',
    md: '8px',
    semi: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },
  fs: {
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    xxl: '20px',
  },
  token: {
    colorPrimary: '#ce1212',
  },
  fontFamily: roboto.style.fontFamily,
};

export const GlobalStyle = createGlobalStyle`
  
`;
