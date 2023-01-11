import { Form } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  padding: 64px;
`;

export const StyledForm = styled(Form)`
  flex: 1;
  padding: 24px 60px;

  margin-left: 120px;
  border-radius: 16px;

  background-color: ${({ theme }) => theme.colors.hBg};
  label {
    color: ${({ theme }) => theme.colors.text} !important;
  }

  .register {
    color: ${({ theme }) => theme.colors.secondaryText};
    a {
      color: ${({ theme }) => theme.colors.active};
    }
  }

  input {
    color: ${({ theme }) => theme.colors.text} !important;
  }
`;

export const Avatar = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background-color: red;
`;
