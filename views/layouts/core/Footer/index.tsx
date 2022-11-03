import { ReactNodeProps } from '@src/types/view-types';
import { FC } from 'react';

const Footer: FC<ReactNodeProps> = ({ children }) => {
  return <footer id="footer">{children}</footer>;
};
export default Footer;
