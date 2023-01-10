import { Button, Form } from 'antd';
import styled from 'styled-components';
export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 64px 0;
`;
export const Container = styled.div`
  background-color: #282424;
  padding: 40px;
  border-radius: 16px;
`;

export const StyledForm = styled(Form)`
  width: 400px;
  label {
    color: ${({ theme }) => theme.colors.text} !important;
  }

  .register {
    color: ${({ theme }) => theme.colors.secondaryText};
    a {
      color: ${({ theme }) => theme.colors.active};
    }
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 24px;
`;

export const SocialButton = styled(Button)`
  width: 100%;
  margin-top: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-right: 12px;
  }

  b {
    margin-left: 4px;
  }
`;
