import { createGlobalStyle } from "styled-components";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export const themes = {
  colors: {
    hBg: "#ECF1F9",
    bg: "#ffffff",
    sBg: "#f6f8fa",
    border: "#e2eef1",
    lightPrimary: "#EAF6F6",
    primary: "#566ffe",
    positive: "#66BFBF",
    negative: "#FF0063",
    text: "#183b56",
    secondaryText: "#6f7d95",
    textContrast: "#FFFFFF",
    secondaryTextContrast: "#B7BDC6",
    icon: "#6f7d95",
  },
  spaces: {
    sm: "4px",
    md: "8px",
    semi: "12px",
    lg: "16px",
    xl: "24px",
    xxl: "32px",
  },
  fs: {
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px",
    xxl: "20px",
  },
  token: {
    colorPrimary: "#566ffe",
  },
  fontFamily: roboto.style.fontFamily,
};

export const GlobalStyle = createGlobalStyle`
  
`;
