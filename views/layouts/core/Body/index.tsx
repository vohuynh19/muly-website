import { FC } from 'react';

import { ReactNodeProps } from '@src/types/view-types';

type Props = ReactNodeProps;

const Body: FC<Props> = ({ children }) => {
  return <div id="body">{children}</div>;
};
export default Body;
