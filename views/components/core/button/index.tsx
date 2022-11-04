import { FC } from 'react';
import { ReactNodeProps } from '~/src/types/view-types';

enum ButtonType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  GHOST = 'GHOST',
  TEXT = 'TEXT',
  LINK = 'LINK',
}

type ButtonProps = ReactNodeProps & {
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: ButtonType;
};

const ButtonCore: FC<ButtonProps> = ({ children, isDisabled, onClick, type }) => {
  return (
    <button disabled={isDisabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonCore;
