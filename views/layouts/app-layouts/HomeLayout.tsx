import { FC } from 'react';
import { ReactNodeProps } from '~/src/types/view-types';

import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeLayout: FC<ReactNodeProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default HomeLayout;
