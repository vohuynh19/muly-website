import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useState } from 'react';
import { PopoverView, WrapperStyled } from './styled';

type JSXComponentProps = JSX.Element | JSX.Element[] | string;

type PropsType = {
  popoverView: JSXComponentProps;
  children: JSXComponentProps;
};

export type PopoverCoreHandle = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const PopoverCore: ForwardRefRenderFunction<PopoverCoreHandle, PropsType> = ({ children, popoverView }, ref) => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setPopoverVisible(true),
    close: () => setPopoverVisible(false),
    toggle: () => setPopoverVisible((prev) => !prev),
  }));

  return (
    <WrapperStyled>
      {children}
      <PopoverView visible={popoverVisible}>{popoverView}</PopoverView>
    </WrapperStyled>
  );
};

export default forwardRef(PopoverCore);
