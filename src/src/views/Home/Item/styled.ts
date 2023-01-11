import styled from 'styled-components';

type ItemWrapperProps = {
  width?: string;
  height?: string;
};
export const ItemWrapper = styled.div<ItemWrapperProps>`
  height: ${({ height }) => height || '256px'};
  width: ${({ width }) => width || '455px'};
  position: relative;
  margin-right: 40px;
  border-radius: 16px;
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .player {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 4px;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.4;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  :hover {
    .player {
      opacity: 1;
      svg {
        color: white;
      }
    }
  }
`;

type TextProps = {
  bottom: number;
  left: number;
  weight?: number;
  size: 'md' | 'lg' | 'xxl';
};

export const Text = styled.div<TextProps>`
  width: 300px;
  margin: 16px 16px;
  overflow: hidden;
  position: absolute;
  bottom: ${({ bottom }) => `${bottom || 0}px`};
  left: ${({ left }) => `${left || 0}px`};
  text-overflow: ellipsis;
  font-weight: ${({ weight }) => weight || 400};
  font-size: ${({ theme, size }) => theme.fs[size]};
  color: ${({ theme }) => theme.colors.text};
`;
