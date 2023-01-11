import { Form, Modal } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.colors.text};
`;
export const ScreenWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 480px;
`;
type ScreenViewProps = {
  show: boolean;
};
export const ScreenView = styled.video<ScreenViewProps>`
  width: 100%;
  height: 480px;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;
export const ToolBar = styled.div`
  width: 240px;
  background-color: ${({ theme }) => theme.colors.sBg};
  text-align: center;
`;

type ToolbarButtonProps = {
  active: boolean;
};
export const ToolbarButton = styled.div<ToolbarButtonProps>`
  width: calc(100%);
  height: 64px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  svg {
    margin-right: 12px;
  }

  cursor: pointer;
  background-color: ${({ theme, active }) => (active ? theme.colors.hBg : theme.colors.sBg)};
`;

export const StyledForm = styled(Form)`
  width: 400px;
  font-weight: 500;
  input {
    width: 100% !important;
  }
`;

export const BecomeStreammer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 600px;

  svg {
    font-size: 200px;
    margin-bottom: 32px;
  }
`;

export const StyledModal = styled(Modal)`
  text-align: center;

  .release {
    font-size: 120px;
  }
`;
