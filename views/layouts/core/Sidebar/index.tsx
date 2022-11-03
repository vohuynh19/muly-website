import { ReactNodeProps } from '@src/types/view-types';
import { FC } from 'react';

const Sidebar: FC<ReactNodeProps> = ({ children }) => {
  return <aside>{children}</aside>;
};
export default Sidebar;
