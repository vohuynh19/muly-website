import styled from 'styled-components';
type CardProps = {
  src: string;
};
export const Card = styled.div<CardProps>`
  height: 200px;
  background-color: white;
  background-image: ${({ src }) => src};
`;
