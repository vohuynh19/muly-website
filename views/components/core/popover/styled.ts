import styled, { css } from 'styled-components';

export const WrapperStyled = styled.div`
  position: relative;
  height: fit-content;
  width: fit-content;
`;

type PopoverViewProps = {
  visible: boolean;
};
export const PopoverView = styled.div<PopoverViewProps>`
  position: absolute;
  top: 100%;

  ${({ visible }) =>
    !visible &&
    css`
      display: none;
    `}
`;
