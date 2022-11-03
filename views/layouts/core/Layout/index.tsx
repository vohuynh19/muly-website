import { FC } from 'react';
import { ReactNodeProps } from '~/src/types/view-types';

const Layout: FC<ReactNodeProps> = ({ children }) => {
  return <div>{children}</div>;
};
export default Layout;
