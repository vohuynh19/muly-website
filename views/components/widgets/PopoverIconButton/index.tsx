import { FC } from 'react';
import { JSXComponentProps, ReactNodeProps } from '~/src/types/view-types';
import { Wrapper } from './styled';

type PropsType = {
  onClick?: () => void;
  popoverView?: JSXComponentProps;
  behavior?: 'click' | 'hover';
} & ReactNodeProps;

const PopupIconButton: FC<PropsType> = ({ children, onClick, popoverView, behavior = 'hover' }) => {
  return <Wrapper>{children}</Wrapper>;
};
export default PopupIconButton;
