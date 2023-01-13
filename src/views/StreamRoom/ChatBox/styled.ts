import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  height: calc(100vh - 64px - 2px);
  display: flex;
  flex-direction: column;
`;
export const Head = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border};
  justify-content: center;
  align-items: center;
  height: 64px;
  font-weight: 500;
  font-size: 16px;
`;
export const Content = styled.div`
  padding: 8px;
  flex: 1;
  overflow: auto;
`;
export const ItemWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  padding-bottom: 8px;
`;
export const Username = styled.div`
  color: ${({ theme }) => theme.colors.active};
  margin: 0px 8px 0 4px;
  font-weight: 500;
`;
export const MessageContent = styled.div`
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  flex-wrap: wrap;
`;
