import "styled-components";
import { themes } from "../styles/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof themes.colors;
    spaces: typeof themes.spaces;
    fs: typeof themes.fs;
    fontFamily: typeof themes.fontFamily;
  }
}
