import styled from 'styled-components';
type CardProps = {
  src: string;
  height: number;
};
export const Card = styled.div<CardProps>`
  height: ${({ height }) => `${height}px`};
  width: 100%;
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ src }) => `url(${src})`};
`;

export const Text = styled.div`
  font-size: ${({ theme }) => theme.fs.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;
