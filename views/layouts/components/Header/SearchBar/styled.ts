import styled from 'styled-components';

export const Wrapper = styled.div`
  /* background-color: white; */
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-radius: 16px;
  height: 32px;
  margin-right: 16px;

  background-color: ${({ color }) => color};

  svg {
    padding: 8px;
  }
`;
