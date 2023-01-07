import { type MenuProps } from 'antd';
import { FC } from 'react';
import Link from 'next/link';

import HomeIcon from '@mui/icons-material/Home';
import CastIcon from '@mui/icons-material/Cast';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { PAGE_ROUTES } from '@src/utils/constants/routes';
import useWindowSizes from '@src/hooks/useWindowSize';

import PCLayout from './PCLayout';
import MobileLayout from './MobileLayout';
import { LocaleWrapper, LocaleItem } from './styled';

type MenuItem = Required<MenuProps>['items'][number];

type Props = {
  children?: JSX.Element;
};

const Layout: FC<Props> = ({ children }) => {
  const { width } = useWindowSizes();
  return width < 768 ? <MobileLayout children={children} /> : <PCLayout children={children} />;
};

export const localePopoverContent = (t: any, setLocaleSetting: any) => {
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

export const itemList = (t: any): MenuItem[] => [
  getItem('home', <Link href={PAGE_ROUTES.HOME}>{t('home')}</Link>, <HomeIcon />),
  getItem('stream-room', <Link href={PAGE_ROUTES.STREAM_ROOM('1')}>{t('Stream')}</Link>, <CastIcon />),
  getItem('profile', <Link href={PAGE_ROUTES.STREAM_ROOM('1')}>{t('Profile')}</Link>, <AccountBoxIcon />),
];

export const getItem = (
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

export const footerColumns = (t: any) => [
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
