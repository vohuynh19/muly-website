import styled from 'styled-components';

export type ItemProps = {
  src: string;
};

export const ItemWrapper = styled.div<ItemProps>`
  height: 256px;
  width: 455px;
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
