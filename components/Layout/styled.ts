import { Button, Layout, Menu } from 'antd';
import styled from 'styled-components';

const { Sider, Header, Footer, Content } = Layout;

export const StyledLayout = styled(Layout)`
  .ant-menu {
    border: none !important;
  }

  .css-dev-only-do-not-override-1i6yeeq {
    font-family: ${({ theme }) => theme.fontFamily};
  }

  .ant-layout-sider-trigger {
    position: static;
    background-color: ${({ theme }) => theme.colors.sBg};
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  .ant-layout-sider-has-trigger {
    .ant-layout-sider-trigger {
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .ant-layout-sider-children {
    background-color: ${({ theme }) => theme.colors.sBg};
  }

  .ant-layout-sider {
    background-color: ${({ theme }) => theme.colors.sBg};
  }

  .ant-layout-sider {
    display: flex;
    flex-direction: column-reverse !important;
  }
`;

export const StyledSider = styled(Sider)`
  & {
    background-color: ${({ theme }) => theme.colors.hBg} !important;
  }
`;

export const StyledHeader = styled(Header)`
  & {
    background-color: transparent !important;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding-inline: 32px !important;
    background: ${({ theme }) => theme.colors.sBg} !important;
  }

  .ant-space-item {
    display: flex;
    align-items: center;
  }
  .logo {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  img {
    margin-right: 4px;
  }
`;
export const StyledFooter = styled(Footer)`
  & {
    background-color: ${({ theme }) => theme.colors.sBg} !important;
    color: ${({ theme }) => theme.colors.text} !important;
  }
`;
export const StyledContent = styled(Content)`
  font-family: ${({ theme }) => theme.fontFamily} !important;
  color: ${({ theme }) => theme.colors.text};
  & {
    background-color: ${({ theme }) => theme.colors.bg};
  }
`;

export const StyledMenu = styled(Menu)`
  & {
    flex: 1;
    background-color: transparent !important;
    font-size: ${({ theme }) => theme.fs.lg};
    color: ${({ theme }) => theme.colors.text};
    svg {
      font-size: ${({ theme }) => theme.fs.lg};
    }
    .ant-menu-item-selected {
      color: ${({ theme }) => theme.colors.text} !important;
      background-color: ${({ theme }) => theme.colors.hBg} !important;
    }

    .ant-menu-item {
      height: 48px;
      display: flex;
      align-items: center;
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: 0px;
      margin-inline: 0;
      margin-inline: 0;

      width: calc(100% - 1px);
      margin-block: 0;

      svg {
        width: 24px;
        height: 24px;
      }

      .ant-menu-title-content {
        margin-inline-start: 32px !important;
        font-weight: 500;
        font-size: 14px;
      }

      &:hover {
        color: ${({ theme }) => theme.colors.secondaryText} !important;
        background-color: ${({ theme }) => theme.colors.hBg} !important;
      }
    }
  }
`;

export const AppLogo = styled.img`
  padding: ${({ theme }) => `${theme.spaces.lg} ${theme.spaces.xl}`};
  cursor: pointer;
  width: 200px;
`;

export const HeaderIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 50%;
  padding: ${({ theme }) => theme.spaces.md};
  &:hover {
    background-color: ${({ theme }) => theme.colors.sBg};
  }

  svg {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const LocaleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const LocaleItem = styled(Button)`
  font-size: ${({ theme }) => theme.fs.lg};
  text-align: start;
`;
export const LoginButton = styled(Button)`
  width: 120px;
`;
