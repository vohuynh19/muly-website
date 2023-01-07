import styled from 'styled-components';

type ItemProps = {
  src: string;
};

export const ItemWrapper = styled.div<ItemProps>`
  height: 256px;
  width: 455px;
  position: relative;
  margin-right: 40px;
  border-radius: 16px;
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ src }) => `url(${src})`};

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 32px;
  }
`;

type TextProps = {
  bottom: number;
  left: number;
  weight?: number;
  size: 'md' | 'lg';
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
