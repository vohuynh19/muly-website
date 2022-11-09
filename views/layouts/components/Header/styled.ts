import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  background-color: black;
  color: white;
`;
export const Logo = styled.div`
  width: 200px;
  height: 100%;
  background-color: red;
`;
export const BodyWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;
export const LeftTabList = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

export const RightTabList = styled.div`
  align-items: center;
  display: flex;
`;

type UnderlineItemProps = {
  isActive?: boolean;
};

export const UnderlineItem = styled.div<UnderlineItemProps>`
  padding: 0 16px;
  position: relative;
  color: grey;
  cursor: pointer;

  &:hover {
    content: '';
    opacity: 0.8;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      color: white;

      &::before {
        content: '';
        position: absolute;
        bottom: -12px;
        width: calc(calc(100%) - calc(48px));
        height: 2px;
        background-color: white;
        left: 50%;
        transform: translateX(-50%);
      }
    `}
`;
export const DepositButton = styled.div``;
