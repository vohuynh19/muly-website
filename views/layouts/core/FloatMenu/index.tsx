import { ReactNodeProps } from '@src/types/view-types';
import { FC } from 'react';

const FloatMenu: FC<ReactNodeProps> = ({ children }) => {
  return <div id="float-menu">{children}</div>;
};
export default FloatMenu;
