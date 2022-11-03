import { ReactNodeProps } from '@src/types/view-types';
import { FC } from 'react';

const Header: FC<ReactNodeProps> = ({ children }) => {
  return <header>{children}</header>;
};
export default Header;
