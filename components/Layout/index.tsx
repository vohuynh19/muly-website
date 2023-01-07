import { Popover, Row, Space, type MenuProps, Col, Button } from 'antd';
import { FC, useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TranslateIcon from '@mui/icons-material/Translate';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

import { PAGE_ROUTES } from '@src/utils/constants/routes';
import { useLocale } from '@src/hooks/useLocale';
import AppContext from '@src/contexts/AppContext';

import {
  HeaderIcon,
  LocaleWrapper,
  StyledContent,
  StyledFooter,
  StyledHeader,
  StyledLayout,
  StyledMenu,
  LocaleItem,
} from './styled';
import SearchBar from '../SearchBar';

type MenuItem = Required<MenuProps>['items'][number];

type Props = {
  children?: JSX.Element;
};

const Layout: FC<Props> = ({ children }) => {
  const { t } = useLocale('common');
  const { isDark, switchTheme, setLocaleSetting } = useContext(AppContext);
  const [collapsed, setCollapsed] = useState(false);

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

          <Button type="primary">Sign in</Button>
        </Space>
      </StyledHeader>

      <StyledLayout>
        <StyledLayout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
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

const localePopoverContent = (t: any, setLocaleSetting: any) => {
  return (
    <LocaleWrapper>
      <LocaleItem type="text" onClick={() => setLocaleSetting({ lang: 'en' })}>
        {t('english')}
      </LocaleItem>
      <LocaleItem type="text" onClick={() => setLocaleSetting({ lang: 'vi' })}>
        {t('vietnamese')}
      </LocaleItem>
    </LocaleWrapper>
  );
};

const itemList = (t: any): MenuItem[] => [
  getItem('home', <Link href={PAGE_ROUTES.HOME}>{t('home')}</Link>),
  getItem('stream-room', <Link href={PAGE_ROUTES.STREAM_ROOM('1')}>{t('stream room')}</Link>),
];

const getItem = (
  key?: React.Key | null,
  label?: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const footerColumns = (t: any) => [
  {
    title: 'About Us',
    children: [
      {
        title: 'About',
        link: '/',
      },
      {
        title: 'Careers',
        link: '/',
      },
      {
        title: 'Business Contact',
        link: '/',
      },
    ],
  },
  {
    title: 'Communities',
    children: [
      {
        title: 'Mediums',
        link: '/',
      },
      {
        title: 'Twitter',
        link: '/',
      },
      {
        title: 'Facebook',
        link: '/',
      },
      {
        title: 'Twitter',
        link: '/',
      },
    ],
  },
  {
    title: 'Help',
    children: [
      {
        title: 'Bug Report',
        link: '/',
      },
      {
        title: 'FAQ',
        link: '/',
      },
      {
        title: 'Discussions',
        link: '/',
      },
    ],
  },
];

export default Layout;
