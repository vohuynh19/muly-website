import styled from 'styled-components';
type CardProps = {
  height: number;
};

export const Card = styled.div<CardProps>`
  height: ${({ height }) => `${height}px`};
  width: 100%;
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Text = styled.div`
  margin-bottom: 32px;
  font-size: ${({ theme }) => theme.fs.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Section = styled.div`
  padding: 0 32px;
  margin: 60px 0;
`;

export const HorizontalList = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  width: 100%;

  @media (max-width: 768px) {
    overflow-x: visible;
    flex-direction: column;
  }
`;
