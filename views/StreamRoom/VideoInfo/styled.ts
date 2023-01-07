import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 64px;
  width: 100%;
  align-items: center;
  padding-right: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;
export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  background-color: red;
`;
export const Info = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const Spacer = styled.div`
  flex: 1;
`;
export const DescItem = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondaryText};
  display: flex;
  align-items: center;
  font-weight: 500;

  svg {
    margin-right: 4px;
  }
`;
export const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
`;
