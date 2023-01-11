import { Popover, Row, Space, Col, Button, message } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import TranslateIcon from '@mui/icons-material/Translate';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { PAGE_ROUTES } from '@src/utils/constants/routes';

import { HeaderIcon, StyledContent, StyledFooter, StyledHeader, StyledLayout, StyledMenu } from './styled';
import SearchBar from '../SearchBar';
import { footerColumns, localePopoverContent, itemList } from '.';
import { useState } from 'react';
import { useContext } from 'react';
import AppContext, { defaultUser } from '@src/contexts/AppContext';
import { useLocale } from '@src/hooks/useLocale';
import { useRouter } from 'next/router';

const PCLayout = ({ children }: any) => {
  const { t } = useLocale('common');
  const { isDark, switchTheme, setLocaleSetting, user, setUser } = useContext(AppContext);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const signOut = () => {
    setUser(defaultUser);
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    router.push(PAGE_ROUTES.LOGIN);
    message.success('Log out success');
  };

  return (
    <StyledLayout>
      <StyledHeader>
        <Link className="logo" href={PAGE_ROUTES.HOME}>
          <Image height={64} width={120} alt="fav" src={'/assets/images/logo.png'} />
        </Link>

        <div style={{ flex: 1 }}>
          <SearchBar />
        </div>

        <Space align="center" size="large">
          <Popover content={localePopoverContent(t, setLocaleSetting)}>
            <HeaderIcon>
              <TranslateIcon />
            </HeaderIcon>
          </Popover>

          <HeaderIcon onClick={() => switchTheme(!isDark)}>{isDark ? <DarkModeIcon /> : <ModeNightIcon />}</HeaderIcon>

          {user.email ? (
            <Link href={PAGE_ROUTES.PROFILE}>
              <Popover
                content={() => (
                  <Button type="primary" onClick={signOut}>
                    Log out
                  </Button>
                )}
              >
                <AccountCircleIcon style={{ marginTop: 28 }} fontSize="large" />
              </Popover>
            </Link>
          ) : (
            <Link href={PAGE_ROUTES.LOGIN}>
              <Button type="primary">Sign in</Button>
            </Link>
          )}
        </Space>
      </StyledHeader>

      <StyledLayout>
        <StyledLayout.Sider className="pc-sider" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <StyledMenu mode="vertical" items={itemList(t)} defaultOpenKeys={['board']} defaultSelectedKeys={['0']} />
        </StyledLayout.Sider>
        <StyledContent>{children}</StyledContent>
      </StyledLayout>

      <StyledFooter>
        <Row>
          {footerColumns(t).map((col) => {
            return (
              <Col key={col.title} span={24 / (footerColumns(t).length + 1)}>
                <h1>{col.title}</h1>

                {col.children.map((row) => (
                  <Link key={row.title} href={row.link}>
                    <div>{row.title}</div>
                  </Link>
                ))}
              </Col>
            );
          })}
          <Col span={24 / (footerColumns(t).length + 1)} style={{ textAlign: 'center' }}>
            <Image width={100} height={100} alt="fav" src={'/assets/images/favicon.png'} />
            <Link href="/">
              <h1>Download now</h1>
            </Link>
          </Col>
        </Row>
      </StyledFooter>
    </StyledLayout>
  );
};

export default PCLayout;
